import { ConversionRequest, ConversionResult } from '../types';

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