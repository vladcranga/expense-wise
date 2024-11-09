package com.vladcranga.currencyconverter.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ConversionRequest {
    @NotNull(message = "From currency is required")
    private String fromCurrency;
    
    @NotNull(message = "To currency is required")
    private String toCurrency;
    
    @Positive(message = "Amount must be positive")
    private double amount;
}
