package com.vladcranga.currencyconverter;

import com.vladcranga.currencyconverter.model.*;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ConversionModelTest {
    @Test
    public void testConversionResult() {
        ConversionResult result = new ConversionResult(85.0, 0.85, "USD", "EUR");

        assertEquals(85.0, result.getConvertedAmount());
        assertEquals(0.85, result.getExchangeRate());
        assertEquals("USD", result.getFromCurrency());
        assertEquals("EUR", result.getToCurrency());
    }
}
