import { describe, it, expect, vi, beforeEach } from 'vitest';
import { convertCurrency, getCurrencyCodes } from '../api';
import { ConversionRequest, ConversionResult } from '../../types';

describe('API Services', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  describe('convertCurrency', () => {
    it('makes correct API call for currency conversion', async () => {
      const mockResponse: ConversionResult = {
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        convertedAmount: 85,
        exchangeRate: 0.85
      };

      (global.fetch as unknown as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        url: 'http://localhost:8080/api/v1/currency/convert',
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const request: ConversionRequest = {
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 100
      };

      const result = await convertCurrency(request);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/v1/currency/convert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('handles API errors', async () => {
      (global.fetch as unknown as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response);

      const request: ConversionRequest = {
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 100
      };

      await expect(convertCurrency(request)).rejects.toThrow('HTTP error 500');
    });
  });

  describe('getCurrencyCodes', () => {
    it('fetches currency codes correctly', async () => {
      const mockCurrencies = ['USD', 'EUR', 'GBP', 'JPY'];

      (global.fetch as unknown as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        url: 'http://localhost:8080/api/v1/currency/codes',
        json: () => Promise.resolve(mockCurrencies)
      } as Response);

      const result = await getCurrencyCodes();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/v1/currency/codes'
      );
      expect(result).toEqual(mockCurrencies);
    });

    it('handles API errors', async () => {
      (global.fetch as unknown as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response);

      await expect(getCurrencyCodes()).rejects.toThrow('HTTP error 500');
    });
  });
});