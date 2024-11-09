package com.vladcranga.currencyconverter.controller;

import com.vladcranga.currencyconverter.model.ConversionRequest;
import com.vladcranga.currencyconverter.model.ConversionResult;
import com.vladcranga.currencyconverter.service.CurrencyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/currency")
public class CurrencyController {
    @Value("${currency.codes.path}")
    private String currencyCodesPath;

    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @PostMapping("/convert")
    public ResponseEntity<ConversionResult> convertCurrency(
            @Valid @RequestBody ConversionRequest request) {
        ConversionResult result = currencyService.convert(
            request.getFromCurrency(),
            request.getToCurrency(),
            request.getAmount()
        );
        return ResponseEntity.ok(result);
    }

    @GetMapping("/codes")
    public ResponseEntity<List<String>> getCurrencyCodes() {
        try {
            List<String> currencyCodes = currencyService.getSupportedCurrencies(currencyCodesPath);
            return ResponseEntity.ok(currencyCodes);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read currency codes: " + e.getMessage(), e);
        }
    }
}
