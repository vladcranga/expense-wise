import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import java.awt.event.MouseEvent;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the CurrencyConverterApp class.
 * This class tests the GUI interaction and integration with the CurrencyConversionService.
 */
public class CurrencyConverterAppTest {

    private CurrencyConverterApp app;
    private MockedStatic<CurrencyConversionService> mockedStatic;

    /**
     * Sets up the CurrencyConverterApp instance and mocks static methods of
     * CurrencyConversionService before each test.
     * Ensures proper mocking of static methods.
     */
    @BeforeEach
    public void setup() {
        mockedStatic = Mockito.mockStatic(CurrencyConversionService.class);

        mockedStatic.when(() -> CurrencyConversionService.readCurrencyCodesFromFile(anyString()))
                    .thenReturn(Arrays.asList("USD", "EUR", "GBP"));
        
        app = new CurrencyConverterApp();
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
     * Tests the button click event with valid input values.
     * Verifies that the conversion result and exchange rate are displayed correctly.
     */
    @Test
    public void testButtonClickWithValidInput() {
        app.fromCurrencies.setSelectedItem("USD");
        app.toCurrencies.setSelectedItem("EUR");
        app.value.setText("100");

        ConversionResult mockResult = new ConversionResult(85.0, 0.85, "USD", "EUR");
        mockedStatic.when(() -> CurrencyConversionService.convert("USD", "EUR", 100.0))
                    .thenReturn(mockResult);

        MouseEvent mockEvent = mock(MouseEvent.class);
        app.buttonMouseClicked(mockEvent);

        assertEquals("Result: 85.00 EUR", app.result.getText(), "Result text should match the expected converted amount");
        assertEquals("Exchange Rate: 1 USD = 0.8500 EUR", app.exchangeRate.getText(), "Exchange rate text should match the expected value");
    }

    /**
     * Tests the button click event with invalid input values.
     * Verifies that the appropriate error message is displayed when the input is not a valid number.
     */
    @Test
    public void testButtonClickWithInvalidInput() {
        app.fromCurrencies.setSelectedItem("USD");
        app.toCurrencies.setSelectedItem("EUR");
        app.value.setText("invalid");

        MouseEvent mockEvent = mock(MouseEvent.class);
        app.buttonMouseClicked(mockEvent);

        assertEquals("Please enter a valid number.", app.result.getText(), "Error message should be displayed for invalid input");
        assertEquals("Exchange Rate: N/A", app.exchangeRate.getText(), "Exchange rate should be N/A for invalid input");
    }
}
