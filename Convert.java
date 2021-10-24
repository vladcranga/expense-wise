/*
A Java program that does currency conversion for some popular currencies.
*Written by: Vlad Mihai Cranga.
*/

import java.awt.Dimension;
import java.awt.Point;
import java.awt.Toolkit;
import java.awt.Container;
import javax.swing.*;

public class Convert extends JFrame
{
    public Convert()
    {
        // frame properties
        setTitle("Currency Converter");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);

        // place the frame in the centre
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension screenDimension = toolkit.getScreenSize();
        setSize(screenDimension.width/2, screenDimension.height/2);
        setLocation(new Point(screenDimension.width/4, screenDimension.height/4));

        // frame content
        Container contentPane = getContentPane();

        JButton button = new JButton("Convert");
        contentPane.add(button);
    }

    public static void main(String[] args) 
    {
        new Convert();
    } 
}