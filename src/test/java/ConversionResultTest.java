import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the ConversionResult class.
 * This class tests the ConversionResult constructor, getters, and toString method.
 */
public class ConversionResultTest {

    /**
     * Tests the constructor and getter methods of the ConversionResult class.
     * Ensures that the converted amount, exchange rate, from currency, and to currency are correctly set and retrieved.
     */
    @Test
    public void testConversionResultConstructorAndGetters() {
        ConversionResult result = new ConversionResult(100.0, 1.5, "USD", "EUR");
        
        assertEquals(100.0, result.getConvertedAmount(), 0.001, "Converted amount should be 100.0");
        assertEquals(1.5, result.getExchangeRate(), 0.001, "Exchange rate should be 1.5");
        assertEquals("USD", result.getFromCurrency(), "From currency should be USD");
        assertEquals("EUR", result.getToCurrency(), "To currency should be EUR");
    }

    /**
     * Tests the toString method of the ConversionResult class.
     * Ensures that the string representation of the conversion result is correctly formatted.
     */
    @Test
    public void testToString() {
        ConversionResult result = new ConversionResult(150.0, 1.5, "USD", "EUR");
        String expected = "150.00 EUR (1 USD = 1.5000 EUR)";
        assertEquals(expected, result.toString(), "toString method should return the expected formatted string");
    }
}
