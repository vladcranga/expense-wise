package com.vladcranga.currencyconverter.service;

import com.vladcranga.currencyconverter.model.ConversionResult;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CurrencyService {
    private static final String API_URL = "https://v6.exchangerate-api.com/v6/";
    
    @Value("${api.key.path}")
    private String apiKeyPath;
    
    private final RestTemplate restTemplate;

    public CurrencyService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ConversionResult convert(String fromCurrency, String toCurrency, double amount) {
        if (fromCurrency.equals(toCurrency)) {
            return new ConversionResult(amount, 1.0, fromCurrency, toCurrency);
        }

        try {
            String apiKey = readApiKeyFromFile(apiKeyPath);
            String url = API_URL + apiKey + "/latest/" + fromCurrency;
            
            String response = restTemplate.getForObject(url, String.class);
            JSONObject jsonResponse = new JSONObject(response);
            
            double conversionRate = jsonResponse.getJSONObject("conversion_rates").getDouble(toCurrency);
            double convertedAmount = amount * conversionRate;
            
            return new ConversionResult(convertedAmount, conversionRate, fromCurrency, toCurrency);
        } catch (Exception e) {
            throw new RuntimeException("Error during conversion", e);
        }
    }

    private String readApiKeyFromFile(String fileName) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            return br.readLine();
        }
    }

    public List<String> getSupportedCurrencies(String fileName) throws IOException {
        List<String> currencyCodes = Files.readAllLines(Paths.get(fileName))
                                        .stream()
                                        .map(String::trim)
                                        .collect(Collectors.toList());
        return currencyCodes;
    }

}
