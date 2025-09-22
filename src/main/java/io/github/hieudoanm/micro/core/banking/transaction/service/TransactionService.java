package io.github.hieudoanm.micro.core.banking.transaction.service;

import io.github.hieudoanm.micro.core.banking.account.entity.Account;
import io.github.hieudoanm.micro.core.banking.account.enums.AccountStatus;
import io.github.hieudoanm.micro.core.banking.account.repository.AccountRepository;
import io.github.hieudoanm.micro.core.banking.audit.service.AuditLogService;
import io.github.hieudoanm.micro.core.banking.kafka.dto.AuditLogEvent;
import io.github.hieudoanm.micro.core.banking.kafka.dto.TransactionEvent;
import io.github.hieudoanm.micro.core.banking.kafka.producer.KafkaProducerService;
import io.github.hieudoanm.micro.core.banking.transaction.dto.CreateTransactionRequest;
import io.github.hieudoanm.micro.core.banking.transaction.entity.Transaction;
import io.github.hieudoanm.micro.core.banking.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final KafkaProducerService kafkaProducerService;

    private static final String SYSTEM_USER = "SYSTEM";

    /**
     * Handle deposit request
     */
    @Transactional
    public Transaction deposit(String accountNumber, BigDecimal amount, String description) {
        Account account = getValidAccount(accountNumber);

        validateAmount(amount);

        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        Transaction transaction = buildTransaction(account, "DEPOSIT", amount, description);
        transactionRepository.save(transaction);

        publishTransactionAndAuditEvents(transaction, "Deposited " + amount + " into account " + accountNumber);

        return transaction;
    }

    /**
     * Handle withdrawal request
     */
    @Transactional
    public Transaction withdraw(String accountNumber, BigDecimal amount, String description) {
        Account account = getValidAccount(accountNumber);

        validateAmount(amount);

        if (account.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient balance for withdrawal.");
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        Transaction transaction = buildTransaction(account, "WITHDRAWAL", amount, description);
        transactionRepository.save(transaction);

        publishTransactionAndAuditEvents(transaction, "Withdrew " + amount + " from account " + accountNumber);

        return transaction;
    }

    /**
     * Transfer funds between two accounts
     */
    @Transactional
    public void transfer(String fromAccountNumber, String toAccountNumber, BigDecimal amount) {
        if (fromAccountNumber.equals(toAccountNumber)) {
            throw new IllegalArgumentException("Cannot transfer to the same account.");
        }

        validateAmount(amount);

        Account fromAccount = getValidAccount(fromAccountNumber);
        Account toAccount = getValidAccount(toAccountNumber);

        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient balance for transfer.");
        }

        // Debit from source
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        accountRepository.save(fromAccount);

        Transaction debitTransaction = buildTransaction(fromAccount, "TRANSFER_DEBIT", amount, "Transfer to " + toAccountNumber);
        transactionRepository.save(debitTransaction);

        // Credit to target
        toAccount.setBalance(toAccount.getBalance().add(amount));
        accountRepository.save(toAccount);

        Transaction creditTransaction = buildTransaction(toAccount, "TRANSFER_CREDIT", amount, "Transfer from " + fromAccountNumber);
        transactionRepository.save(creditTransaction);

        // Publish Kafka events
        publishTransactionAndAuditEvents(debitTransaction,
                "Transferred " + amount + " from " + fromAccountNumber + " to " + toAccountNumber);

        publishTransactionAndAuditEvents(creditTransaction,
                "Received " + amount + " from " + fromAccountNumber + " to " + toAccountNumber);
    }

    /**
     * Single entry point for transaction creation based on request
     */
    @Transactional
    public Transaction createTransaction(CreateTransactionRequest request) {
        String type = request.getTransactionType().toUpperCase();
        validateTransactionType(type);
        validateAmount(request.getAmount());

        Account fromAccount = getValidAccount(request.getFromAccountNumber());
        Account toAccount = null;

        // If transfer, validate destination account
        if (type.equals("TRANSFER")) {
            if (request.getToAccountNumber() == null || request.getToAccountNumber().isBlank()) {
                throw new IllegalArgumentException("Destination account number is required for transfer.");
            }

            if (request.getFromAccountNumber().equals(request.getToAccountNumber())) {
                throw new IllegalArgumentException("Cannot transfer to the same account.");
            }

            toAccount = getValidAccount(request.getToAccountNumber());
        }

        // Execute business logic
        executeTransactionLogic(type, fromAccount, toAccount, request.getAmount());

        // Create single transaction record
        Transaction transaction = buildTransaction(fromAccount, type, request.getAmount(), request.getDescription());
        transactionRepository.save(transaction);

        // Publish Kafka events
        String auditMessage = buildAuditMessage(type, fromAccount, toAccount, request.getAmount());
        publishTransactionAndAuditEvents(transaction, auditMessage);

        return transaction;
    }

    /**
     * Core logic for updating balances based on transaction type
     */
    private void executeTransactionLogic(String type, Account fromAccount, Account toAccount, BigDecimal amount) {
        switch (type) {
            case "DEPOSIT" -> {
                fromAccount.setBalance(fromAccount.getBalance().add(amount));
                accountRepository.save(fromAccount);
            }
            case "WITHDRAWAL" -> {
                if (fromAccount.getBalance().compareTo(amount) < 0) {
                    throw new IllegalArgumentException("Insufficient balance for withdrawal.");
                }
                fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
                accountRepository.save(fromAccount);
            }
            case "TRANSFER" -> {
                if (fromAccount.getBalance().compareTo(amount) < 0) {
                    throw new IllegalArgumentException("Insufficient balance for transfer.");
                }
                fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
                toAccount.setBalance(toAccount.getBalance().add(amount));
                accountRepository.save(fromAccount);
                accountRepository.save(toAccount);
            }
        }
    }

    /**
     * Validate that amount is greater than zero
     */
    private void validateAmount(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero.");
        }
    }

    /**
     * Ensure transaction type is valid
     */
    private void validateTransactionType(String type) {
        if (!type.equals("DEPOSIT") && !type.equals("WITHDRAWAL") && !type.equals("TRANSFER")) {
            throw new IllegalArgumentException("Invalid transaction type: " + type);
        }
    }

    /**
     * Helper method to validate and retrieve an active account
     */
    private Account getValidAccount(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .filter(acc -> acc.getStatus() == AccountStatus.ACTIVE)
                .orElseThrow(() -> new IllegalArgumentException("Account not found or inactive."));
    }

    /**
     * Build a new Transaction entity
     */
    private Transaction buildTransaction(Account account, String type, BigDecimal amount, String description) {
        return Transaction.builder()
                .account(account)
                .transactionType(type)
                .amount(amount)
                .description(description)
                .createdAt(LocalDateTime.now())
                .build();
    }

    /**
     * Build an audit message string
     */
    private String buildAuditMessage(String type, Account fromAccount, Account toAccount, BigDecimal amount) {
        return switch (type) {
            case "DEPOSIT" -> "Deposited " + amount + " into account " + fromAccount.getAccountNumber();
            case "WITHDRAWAL" -> "Withdrew " + amount + " from account " + fromAccount.getAccountNumber();
            case "TRANSFER" -> "Transferred " + amount + " from " + fromAccount.getAccountNumber() +
                    " to " + toAccount.getAccountNumber();
            default -> "Unknown transaction action";
        };
    }

    /**
     * Publish both transaction and audit log events to Kafka
     */
    private void publishTransactionAndAuditEvents(Transaction transaction, String auditMessage) {
        // Transaction event
        kafkaProducerService.sendTransactionEvent(TransactionEvent.builder()
                .transactionId(transaction.getId().toString())
                .accountNumber(transaction.getAccount().getAccountNumber())
                .type(transaction.getTransactionType())
                .amount(transaction.getAmount())
                .currency(transaction.getAccount().getCurrency())
                .timestamp(LocalDateTime.now())
                .build());

        // Audit log event
        kafkaProducerService.sendAuditLogEvent(AuditLogEvent.builder()
                .action(transaction.getTransactionType())
                .entityType("Transaction")
                .entityId(transaction.getId())
                .message(auditMessage)
                .createdBy(SYSTEM_USER)
                .createdAt(LocalDateTime.now())
                .build());
    }
}
