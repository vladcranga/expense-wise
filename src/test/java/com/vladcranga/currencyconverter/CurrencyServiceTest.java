package com.vladcranga.currencyconverter;

import com.vladcranga.currencyconverter.service.CurrencyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class CurrencyServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private CurrencyService currencyService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetSupportedCurrencies() throws IOException {
        String fileName = "currency_codes.txt";
        List<String> currencies = currencyService.getSupportedCurrencies(fileName);

        assertNotNull(currencies);
        assertTrue(currencies.size() > 0);
    }
}
