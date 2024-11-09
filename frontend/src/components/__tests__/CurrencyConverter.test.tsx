import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyConverter from '../CurrencyConverter';
import { convertCurrency, getCurrencyCodes } from '../../services/api';

vi.mock('../../services/api', () => ({
  convertCurrency: vi.fn(),
  getCurrencyCodes: vi.fn()
}));

describe('CurrencyConverter', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (getCurrencyCodes as unknown as jest.MockedFunction<typeof getCurrencyCodes>).mockResolvedValue(
        ['USD', 'EUR', 'GBP', 'JPY']);
    (convertCurrency as unknown as jest.MockedFunction<typeof convertCurrency>).mockResolvedValue({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      convertedAmount: 85,
      exchangeRate: 0.85
    });
  });

  it('renders the currency converter form', async () => {
    render(<CurrencyConverter />);
    
    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
    expect(screen.getByLabelText(/Convert From:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Convert To:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument();
  });

  it('performs currency conversion when form is submitted', async () => {
    const user = userEvent.setup();
    render(<CurrencyConverter />);

    const amountInput = screen.getByLabelText(/Amount:/i);
    await user.clear(amountInput);
    await user.type(amountInput, '100');

    const convertButton = screen.getByRole('button', { name: /convert/i });
    await user.click(convertButton);

    await waitFor(() => {
      expect(convertCurrency).toHaveBeenCalledWith({
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 100
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/85.00 EUR/)).toBeInTheDocument();
      expect(screen.getByText(/0.8500 EUR/)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (convertCurrency as unknown as jest.MockedFunction<typeof convertCurrency>).mockRejectedValue(new Error('API Error'));

    const user = userEvent.setup();
    render(<CurrencyConverter />);

    const amountInput = screen.getByLabelText(/Amount:/i);
    await user.clear(amountInput);
    await user.type(amountInput, '100');

    const convertButton = screen.getByRole('button', { name: /convert/i });
    await user.click(convertButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});