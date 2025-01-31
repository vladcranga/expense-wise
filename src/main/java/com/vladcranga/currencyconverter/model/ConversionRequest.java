package com.vladcranga.currencyconverter.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;

/**
 * Request model for currency conversion operations.
 */
@Data
public class ConversionRequest {
    @NotBlank(message = "From currency is required")
    @Pattern(regexp = "^[A-Z]{3}$", message = "From currency must be a 3-letter ISO currency code")
    private String fromCurrency;
    
    @NotBlank(message = "To currency is required")
    @Pattern(regexp = "^[A-Z]{3}$", message = "To currency must be a 3-letter ISO currency code")
    private String toCurrency;
    
    @Positive(message = "Amount must be positive")
    private double amount;
}
