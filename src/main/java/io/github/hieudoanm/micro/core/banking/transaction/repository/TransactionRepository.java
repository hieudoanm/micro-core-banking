package io.github.hieudoanm.micro.core.banking.transaction.repository;

import io.github.hieudoanm.micro.core.banking.transaction.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Find all transactions for an account
    List<Transaction> findByAccountId(Long accountId);

    // Find transactions within a time range
    List<Transaction> findByAccountIdAndCreatedAtBetween(Long accountId, LocalDateTime start, LocalDateTime end);

    // Find all transactions by type
    List<Transaction> findByTransactionType(String transactionType);

    // Find all transactions for multiple accounts
    List<Transaction> findByAccountIdIn(List<Long> accountIds);
}
