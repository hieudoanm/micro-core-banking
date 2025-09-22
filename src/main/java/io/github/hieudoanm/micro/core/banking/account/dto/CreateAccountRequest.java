package io.github.hieudoanm.micro.core.banking.account.dto;

import io.github.hieudoanm.micro.core.banking.account.enums.AccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateAccountRequest {
    @NotBlank
    private String customerId;

    @NotNull
    private AccountType accountType;

    @NotBlank
    private String currency;

    private BigDecimal initialBalance = BigDecimal.ZERO;
}
