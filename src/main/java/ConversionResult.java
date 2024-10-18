/**
 * Represents the result of a currency conversion operation.
 * This class encapsulates the converted amount, exchange rate, and the currencies involved.
 */
public class ConversionResult {
    private final double convertedAmount;
    private final double exchangeRate;
    private final String fromCurrency;
    private final String toCurrency;

    /**
     * Constructs a new ConversionResult with the specified parameters.
     *
     * @param convertedAmount The amount after conversion
     * @param exchangeRate The exchange rate used for the conversion
     * @param fromCurrency The currency code converted from
     * @param toCurrency The currency code converted to
     */
    public ConversionResult(double convertedAmount, double exchangeRate, String fromCurrency, String toCurrency) {
        this.convertedAmount = convertedAmount;
        this.exchangeRate = exchangeRate;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
    }

    /**
     * @return The converted amount
     */
    public double getConvertedAmount() {
        return convertedAmount;
    }

    /**
     * @return The exchange rate used for the conversion
     */
    public double getExchangeRate() {
        return exchangeRate;
    }

    /**
     * @return The currency code converted from
     */
    public String getFromCurrency() {
        return fromCurrency;
    }

    /**
     * @return The currency code converted to
     */
    public String getToCurrency() {
        return toCurrency;
    }

    /**
     * Returns a string representation of the conversion result.
     *
     * @return A formatted string containing the converted amount and exchange rate
     */
    @Override
    public String toString() {
        return String.format("%.2f %s (1 %s = %.4f %s)", 
            convertedAmount, toCurrency, fromCurrency, exchangeRate, toCurrency);
    }
}