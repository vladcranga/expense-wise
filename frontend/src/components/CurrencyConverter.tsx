import React, { useState } from 'react';
import CurrencySelect from './CurrencySelect';
import ConversionResult from './ConversionResult';
import { convertCurrency } from '../services/api';
import { ConversionResult as ConversionResultType } from '../types';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const baseCurrency = localStorage.getItem('baseCurrency') || 'EUR';
  const [toCurrency, setToCurrency] = useState<string>(baseCurrency);
  const [conversionResult, setConversionResult] = useState<ConversionResultType | null>(null);

  const handleConvert = async () => {
    try {
      const result = await convertCurrency({
        fromCurrency,
        toCurrency,
        amount
      });
      setConversionResult(result);
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  };

  return (
    <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg mt-10 text-center">
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-2 text-gray-700">
          <CurrencySelect
            label="Convert From:"
            value={fromCurrency}
            onChange={setFromCurrency}
            className="w-full p-2 border rounded-md"
          />
          <CurrencySelect
            label="Convert To:"
            value={toCurrency}
            onChange={setToCurrency}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="amount" className="text-lg text-gray-700">
            Amount:
          </label>
          <input
            type="number"
            min="0"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
          />
        </div>
        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
        >
          Convert
        </button>
        {conversionResult && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <ConversionResult result={conversionResult} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
