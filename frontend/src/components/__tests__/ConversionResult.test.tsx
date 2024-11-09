import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ConversionResult from '../ConversionResult';

describe('ConversionResult', () => {
  const mockResult = {
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    amount: 100,
    convertedAmount: 85,
    exchangeRate: 0.85
  };

  it('renders conversion result correctly', () => {
    render(<ConversionResult result={mockResult} />);

    expect(screen.getByText(/85.00 EUR/)).toBeInTheDocument();
    expect(screen.getByText(/0.8500 EUR/)).toBeInTheDocument();
  });

  it('formats numbers correctly', () => {
    const resultWithDecimals = {
      ...mockResult,
      convertedAmount: 85.6789,
      exchangeRate: 0.856789
    };

    render(<ConversionResult result={resultWithDecimals} />);

    expect(screen.getByText(/85.68 EUR/)).toBeInTheDocument();
    expect(screen.getByText(/0.8568 EUR/)).toBeInTheDocument();
  });
});