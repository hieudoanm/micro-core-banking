package io.github.hieudoanm.micro.core.banking.transaction.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class WithdrawRequest {

    @NotBlank(message = "Account number is required.")
    private String accountNumber;

    @NotNull(message = "Amount is required.")
    @DecimalMin(value = "0.01", message = "Withdrawal amount must be greater than 0.")
    private BigDecimal amount;

    @Size(max = 255, message = "Description cannot exceed 255 characters.")
    private String description;
}
