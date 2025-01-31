package com.vladcranga.currencyconverter.controller;

import com.vladcranga.currencyconverter.model.ConversionRequest;
import com.vladcranga.currencyconverter.model.ConversionResult;
import com.vladcranga.currencyconverter.service.CurrencyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * REST controller for currency conversion operations.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/currency")
public class CurrencyController {
    @Value("${currency.codes.path}")
    private String currencyCodesPath;

    private final CurrencyService currencyService;

    public CurrencyController(@NonNull CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    /**
     * Converts an amount from one currency to another.
     *
     * @param request The conversion request containing source currency, target currency, and amount
     * @return ResponseEntity containing the conversion result
     */
    @PostMapping("/convert")
    public ResponseEntity<ConversionResult> convertCurrency(@Valid @RequestBody @NonNull ConversionRequest request) {
        ConversionResult result = currencyService.convert(
                request.getFromCurrency(),
                request.getToCurrency(),
                request.getAmount()
        );
        return ResponseEntity.ok(result);
    }

    /**
     * Retrieves the list of supported currency codes.
     *
     * @return ResponseEntity containing the list of currency codes
     * @throws RuntimeException if there is an error reading the currency codes
     */
    @GetMapping("/codes")
    public ResponseEntity<List<String>> getCurrencyCodes() {
        try {
            List<String> currencyCodes = currencyService.getSupportedCurrencies(currencyCodesPath);
            return ResponseEntity.ok(currencyCodes);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read currency codes", e);
        }
    }
}
