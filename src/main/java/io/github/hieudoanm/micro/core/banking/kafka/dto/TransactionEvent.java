package io.github.hieudoanm.micro.core.banking.kafka.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class TransactionEvent {
    private String transactionId;
    private String accountNumber;
    private String type; // DEPOSIT, WITHDRAWAL, TRANSFER
    private BigDecimal amount;
    private String currency;
    private LocalDateTime timestamp;
}
