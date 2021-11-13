/*
A Java program that does currency conversion for some popular currencies.
*Written by: Vlad Mihai Cranga.
*/

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Convert extends JFrame
{
    // currency values
    double usd_gbp = 0.73;
    double usd_eur = 0.86;
    double gbp_usd = 1.38;
    double gbp_eur = 1.18;
    double eur_usd = 1.16;
    double eur_gbp = 0.85;
    
    // variables used in mousePressed
    JComboBox fromCurrencies;
    JComboBox toCurrencies;
    JLabel result;
    JTextField value;

    public Convert()
    {
        // frame properties
        setTitle("Currency Converter");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);
        setVisible(true);

        // place the frame in the centre of the screen
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension screenDimension = toolkit.getScreenSize();
        setSize(screenDimension.width/3, screenDimension.height/2);
        setLocation(new Point(screenDimension.width/4, screenDimension.height/4));

        // frame layout
        Container contentPane = getContentPane();
        contentPane.setLayout(new BorderLayout());

        // frame content
        JLabel title = new JLabel("<html>Currency Converter<br><br></html>", JLabel.CENTER);
        contentPane.add(title, BorderLayout.NORTH);

        JPanel centreContent = new JPanel();
        centreContent.setLayout(new BoxLayout(centreContent, BoxLayout.Y_AXIS));

        JLabel convertFrom = new JLabel("<html>Select the currency to convert from:<br><br></html>");
        centreContent.add(convertFrom);

        String[] currencies = {"USD", "GBP", "EUR"};
        fromCurrencies = new JComboBox(currencies);
        fromCurrencies.setSelectedItem(currencies[0]);
        centreContent.add(fromCurrencies);

        JLabel convertTo = new JLabel("<html>Select the currency to convert to:<br><br></html>");
        centreContent.add(convertTo);

        toCurrencies = new JComboBox(currencies);
        toCurrencies.setSelectedItem(currencies[1]);
        centreContent.add(toCurrencies);

        JLabel amount = new JLabel("<html>Enter the amount of money you want to convert:<br><br></html>");
        centreContent.add(amount);

        value = new JTextField(2);
        centreContent.add(value);

        result = new JLabel("<html>Result: </html>");
        centreContent.add(result);

        contentPane.add(centreContent, BorderLayout.CENTER);

        JButton button = new JButton("<html><b>Convert</b></html>");
        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                buttonMouseClicked(evt);
            }
        });
        contentPane.add(button, BorderLayout.SOUTH);
    }


    public static void main(String[] args) 
    {
        new Convert();
    }

    // mouse click method for currency conversion
    public void buttonMouseClicked(java.awt.event.MouseEvent e) {
        if (fromCurrencies.getSelectedItem().equals(toCurrencies.getSelectedItem())) 
        {
            result.setText("<html>Result: " + String.valueOf(value.getText()) 
                + " </html>");
        }

        else if (fromCurrencies.getSelectedItem() == "USD" && toCurrencies.getSelectedItem() == "GBP") 
        {
            result.setText("<html>Result: " + String.valueOf(Double.valueOf(value.getText()) * usd_gbp) 
                        + " GBP</html>");
        }

        else if (fromCurrencies.getSelectedItem() == "GBP" && toCurrencies.getSelectedItem() == "USD") 
        {
            result.setText("<html>Result: $" + String.valueOf(Double.valueOf(value.getText()) * gbp_usd) 
                + "</html>");
        }

        else if (fromCurrencies.getSelectedItem() == "USD" && toCurrencies.getSelectedItem() == "EUR") 
        {
            result.setText("<html>Result: " + String.valueOf(Double.valueOf(value.getText()) * usd_eur) 
                + " EUR</html>");
        }

        else if (fromCurrencies.getSelectedItem() == "GBP" && toCurrencies.getSelectedItem() == "EUR") 
        {
            result.setText("<html>Result: " + String.valueOf(Double.valueOf(value.getText()) * gbp_eur) 
                + " EUR</html>");
        }

        else if (fromCurrencies.getSelectedItem() == "EUR" && toCurrencies.getSelectedItem() == "GBP") 
        {
            result.setText("<html>Result: " + String.valueOf(Double.valueOf(value.getText()) * eur_gbp) 
                + " GBP</html>");
        }

        else if (fromCurrencies.getSelectedItem() == "EUR" && toCurrencies.getSelectedItem() == "USD") 
        {
            result.setText("<html>Result: $" + String.valueOf(Double.valueOf(value.getText()) * eur_usd) 
                + "</html>");
        }

        else
        {
            result.setText
                ("<html>Conversion failed, type a number or select two different currencies.</html>");
        }

    }
}