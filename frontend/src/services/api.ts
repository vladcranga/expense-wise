import axios from "axios";
import { ConversionRequest, ConversionResult } from "../types";

const CALC_API_URL = import.meta.env.VITE_CALC_APP_API_URL;

export const convertCurrency = async (
  request: ConversionRequest,
): Promise<ConversionResult> => {
  const response = await fetch(
    "http://localhost:8080/api/v1/currency/convert",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
};

export const getCurrencyCodes = async (): Promise<string[]> => {
  const response = await fetch("http://localhost:8080/api/v1/currency/codes");
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  return response.json();
};

export const calculate = async (
  operation: string,
  num1: string | number,
  num2: string | number | null = null,
): Promise<number> => {
  try {
    // In test environment, use a default URL if not configured
    const apiUrl = CALC_API_URL || "http://test-calculator-api.com";

    const payload = {
      operation,
      num1: parseFloat(num1.toString()),
      num2: num2 !== null ? parseFloat(num2.toString()) : null,
    };

    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
};
