import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.ArrayList;
import org.json.JSONObject;

/**
 * Service class for handling currency conversion operations.
 * This class interacts with the ExchangeRate API to fetch current exchange rates.
 */
public class CurrencyConversionService {
    private static final String API_URL = "https://v6.exchangerate-api.com/v6/";
    private static final String API_KEY_FILE = "api_key.txt";

    /**
     * Converts an amount from one currency to another.
     *
     * @param fromCurrency The currency code to convert from
     * @param toCurrency The currency code to convert to
     * @param amount The amount to convert
     * @return A ConversionResult object containing the conversion details
     * @throws IllegalArgumentException if there's an error during the conversion process
     */
    public static ConversionResult convert(String fromCurrency, String toCurrency, double amount) {
        if (fromCurrency.equals(toCurrency)) {
            return new ConversionResult(amount, 1.0, fromCurrency, toCurrency);
        }

        try {
            String apiKey = readApiKeyFromFile(API_KEY_FILE);
            String urlStr = API_URL + apiKey + "/latest/" + fromCurrency;
            URL url = new URL(urlStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            int responseCode = conn.getResponseCode();
            // Check if the API request was successful
            if (responseCode == 200) {
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                // Parse the JSON response and extract the conversion rate
                JSONObject jsonResponse = new JSONObject(response.toString());
                double conversionRate = jsonResponse.getJSONObject("conversion_rates").getDouble(toCurrency);
                double convertedAmount = amount * conversionRate;
                return new ConversionResult(convertedAmount, conversionRate, fromCurrency, toCurrency);
            } else {
                throw new IllegalArgumentException("Failed to get exchange rate: " + responseCode);
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Error during conversion: " + e.getMessage());
        }
    }

    /**
     * Reads the API key from a file.
     *
     * @param fileName The name of the file containing the API key
     * @return The API key as a string
     * @throws IOException if there's an error reading the file
     */
    public static String readApiKeyFromFile(String fileName) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader(fileName));
        String apiKey = br.readLine();
        br.close();
        return apiKey;
    }

    /**
     * Reads currency codes from a file.
     *
     * @param filename The name of the file containing currency codes
     * @return A list of currency codes
     * @throws IOException if there's an error reading the file
     */
    public static List<String> readCurrencyCodesFromFile(String filename) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader(filename));
        String currencyCode;
        List<String> currencyCodes = new ArrayList<>();
        while ((currencyCode = br.readLine()) != null) {
            currencyCodes.add(currencyCode.trim());
        }
        br.close();
        return currencyCodes;
    }
}