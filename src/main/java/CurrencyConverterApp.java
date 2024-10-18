import java.awt.*;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.*;
import java.util.List;

/**
 * A Java program that performs currency conversion for popular currencies.
 * This application provides a graphical user interface for currency conversion.
 */
public class CurrencyConverterApp extends JFrame {
    public static final String CURRENCY_CODES_FILE = "currency_codes.txt";

    public JComboBox<String> fromCurrencies;
    public JComboBox<String> toCurrencies;
    public JLabel result;
    public JLabel exchangeRate;
    public JTextField value;
    public List<String> currencyList;

    /**
     * Constructs the CurrencyConverterApp and initializes the GUI.
     */
    public CurrencyConverterApp() {
        // Set frame properties
        setTitle("Currency Converter");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        // Load and set the application icon
        // Credits: https://www.flaticon.com/free-icons/business-and-finance
        // Business and finance icons created by cah nggunung - Flaticon
        Image iconImage = null;
        try {
            iconImage = ImageIO.read(new File("icon.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (iconImage != null) {
            setIconImage(iconImage);
        }

        // Center the frame on the screen
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension screenDimension = toolkit.getScreenSize();
        setSize(screenDimension.width/3, screenDimension.height/2);
        setLocation(new Point(screenDimension.width/4, screenDimension.height/4));

        // Set up the frame layout
        Container contentPane = getContentPane();
        contentPane.setLayout(new BorderLayout());

        // Add the title
        JLabel title = new JLabel("Currency Converter", JLabel.CENTER);
        title.setFont(new Font("Arial", Font.BOLD, 20));
        contentPane.add(title, BorderLayout.NORTH);

        // Set up the main content panel
        JPanel centreContent = new JPanel();
        centreContent.setLayout(new BoxLayout(centreContent, BoxLayout.Y_AXIS));
        centreContent.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));

        // Add components to the main content panel
        addComponentsToCentreContent(centreContent);

        contentPane.add(centreContent, BorderLayout.CENTER);

        // Add the convert button
        JButton button = new JButton("Convert");
        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                buttonMouseClicked(evt);
            }
        });
        contentPane.add(button, BorderLayout.SOUTH);

        pack();
        setVisible(true);
    }

    /**
     * Adds components to the main content panel.
     *
     * @param centreContent The main content panel
     */
    private void addComponentsToCentreContent(JPanel centreContent) {
        // From currency selection
        JLabel convertFrom = new JLabel("Select the currency to convert from:");
        convertFrom.setAlignmentX(Component.LEFT_ALIGNMENT);
        centreContent.add(convertFrom);
        centreContent.add(Box.createRigidArea(new Dimension(0, 5)));

        // Load currency list
        try {
            currencyList = CurrencyConversionService.readCurrencyCodesFromFile(CURRENCY_CODES_FILE);
        } catch (IOException e) {
            e.printStackTrace();
        }

        fromCurrencies = new JComboBox<>(currencyList.toArray(new String[0]));
        fromCurrencies.setSelectedItem("USD");
        fromCurrencies.setAlignmentX(Component.LEFT_ALIGNMENT);
        centreContent.add(fromCurrencies);
        centreContent.add(Box.createRigidArea(new Dimension(0, 10)));

        // To currency selection
        JLabel convertTo = new JLabel("Select the currency to convert to:");
        convertTo.setAlignmentX(Component.LEFT_ALIGNMENT);
        centreContent.add(convertTo);
        centreContent.add(Box.createRigidArea(new Dimension(0, 5)));

        toCurrencies = new JComboBox<>(currencyList.toArray(new String[0]));
        toCurrencies.setSelectedItem("GBP");
        toCurrencies.setAlignmentX(Component.LEFT_ALIGNMENT);
        centreContent.add(toCurrencies);
        centreContent.add(Box.createRigidArea(new Dimension(0, 10)));

        // Amount input
        JLabel amount = new JLabel("Enter the amount of money you want to convert:");
        amount.setAlignmentX(Component.LEFT_ALIGNMENT);
        centreContent.add(amount);
        centreContent.add(Box.createRigidArea(new Dimension(0, 5)));

        value = new JTextField(2);
        value.setAlignmentX(Component.LEFT_ALIGNMENT);
        centreContent.add(value);
        centreContent.add(Box.createRigidArea(new Dimension(0, 10)));

        // Result and exchange rate labels
        result = new JLabel("Result: ");
        result.setAlignmentX(Component.LEFT_ALIGNMENT);
        centreContent.add(result);

        exchangeRate = new JLabel("Exchange Rate: ");
        exchangeRate.setAlignmentX(Component.LEFT_ALIGNMENT);
        centreContent.add(exchangeRate);
    }

    /**
     * The main method to launch the application.
     *
     * @param args Command line arguments (not used)
     */
    public static void main(String[] args) {
        SwingUtilities.invokeLater(CurrencyConverterApp::new);
    }

    /**
     * Handles the currency conversion when the convert button is clicked.
     *
     * @param e The mouse event
     */
    public void buttonMouseClicked(java.awt.event.MouseEvent e) {
        try {
            String fromCurrency = (String) fromCurrencies.getSelectedItem();
            String toCurrency = (String) toCurrencies.getSelectedItem();
            double amount = Double.parseDouble(value.getText());

            ConversionResult conversionResult = 
                CurrencyConversionService.convert(fromCurrency, toCurrency, amount);

            // Display the conversion result
            String resultText = String.format("%.2f %s", 
                conversionResult.getConvertedAmount(), 
                conversionResult.getToCurrency());
            result.setText("Result: " + resultText);

            // Display the exchange rate
            String rateText = String.format("1 %s = %.4f %s", 
                conversionResult.getFromCurrency(), 
                conversionResult.getExchangeRate(), 
                conversionResult.getToCurrency());
            exchangeRate.setText("Exchange Rate: " + rateText);
        } catch (NumberFormatException ex) {
            result.setText("Please enter a valid number.");
            exchangeRate.setText("Exchange Rate: N/A");
        } catch (IllegalArgumentException ex) {
            result.setText("<html>" + ex.getMessage());
            exchangeRate.setText("Exchange Rate: N/A");
        }
    }
}