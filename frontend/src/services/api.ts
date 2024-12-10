import axios from 'axios';
import { ConversionRequest, ConversionResult } from '../types';

const CALC_API_URL = import.meta.env.VITE_CALC_APP_API_URL;

export const convertCurrency = async (request: ConversionRequest): Promise<ConversionResult> => {
  const response = await fetch('http://localhost:8080/api/v1/currency/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
};

export const getCurrencyCodes = async (): Promise<string[]> => {
  const response = await fetch('http://localhost:8080/api/v1/currency/codes');
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  return response.json();
};

export const calculate = async (operation: string, num1: string | number, num2: string | number | null = null): Promise<number> => {
  try {
      if (!CALC_API_URL) {
          throw new Error('Calculator API URL is not configured');
      }

      const payload = {
          operation,
          num1: parseFloat(num1.toString()),
          num2: num2 !== null ? parseFloat(num2.toString()) : null
      };
      
      const response = await axios.post(CALC_API_URL, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });

      // Extract the result from the response data
      return response.data.result;
  } catch (error: unknown) {
      console.error('Failed API call:', error instanceof Error ? error : (error as { message?: string }).message);
      throw error;
  }
};