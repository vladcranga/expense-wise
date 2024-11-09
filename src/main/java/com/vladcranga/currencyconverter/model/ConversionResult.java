package com.vladcranga.currencyconverter.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversionResult {
    private double convertedAmount;
    private double exchangeRate;
    private String fromCurrency;
    private String toCurrency;
}
