package io.github.hieudoanm.micro.core.banking.transaction.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class TransactionResponse {
    private Long transactionId;
    private String accountNumber;
    private String transactionType; // e.g., DEPOSIT, WITHDRAWAL, TRANSFER_DEBIT, TRANSFER_CREDIT
    private BigDecimal amount;
    private String description;
    private LocalDateTime createdAt;
}
