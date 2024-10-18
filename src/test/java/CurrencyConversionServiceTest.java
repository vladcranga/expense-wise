import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the CurrencyConversionService class.
 * This class tests the conversion logic and file reading capabilities
 * of the CurrencyConversionService class.
 */
public class CurrencyConversionServiceTest {

    private MockedStatic<CurrencyConversionService> mockedStatic;

    /**
     * Sets up the mocked static instance of CurrencyConversionService before each test.
     * This ensures that the static methods can be mocked properly during the test execution.
     */
    @BeforeEach
    public void setup() {
        mockedStatic = Mockito.mockStatic(CurrencyConversionService.class, Mockito.CALLS_REAL_METHODS);
    }

    /**
     * Tears down the mocked static instance of CurrencyConversionService after each test.
     * Releases any resources held by the mock to avoid interference between tests.
     */
    @AfterEach
    public void teardown() {
        if (mockedStatic != null) {
            mockedStatic.close();
        }
    }

    /**
     * Tests the convert method when the from and to currencies are the same.
     * Ensures that no conversion is performed and the original amount is returned.
     */
    @Test
    public void testConvertSameCurrency() {
        ConversionResult result = CurrencyConversionService.convert("USD", "USD", 100.0);

        assertEquals(100.0, result.getConvertedAmount(), 0.001, "Converted amount should be 100.0");
        assertEquals(1.0, result.getExchangeRate(), 0.001, "Exchange rate should be 1.0");
        assertEquals("USD", result.getFromCurrency(), "From currency should be USD");
        assertEquals("USD", result.getToCurrency(), "To currency should be USD");
    }

    /**
     * Tests the readCurrencyCodesFromFile method to ensure it reads currency codes correctly.
     * Verifies that the list of currency codes is not empty and contains specific expected values.
     */
    @Test
    public void testReadCurrencyCodesFromFile() throws IOException {
        List<String> currencyCodes = CurrencyConversionService.readCurrencyCodesFromFile("currency_codes.txt");

        assertFalse(currencyCodes.isEmpty(), "Currency codes list should not be empty");
        assertTrue(currencyCodes.contains("USD"), "Currency codes list should contain USD");
        assertTrue(currencyCodes.contains("EUR"), "Currency codes list should contain EUR");
    }
}
