import React, { useState, useEffect } from "react";
import { getCurrencyCodes } from "../services/api";

interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const codes = await getCurrencyCodes();
        setCurrencies(codes);
      } catch (error) {
        console.error("Error fetching currency codes:", error);
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <div>
      <label
        htmlFor={`${label.toLowerCase()}-currency`}
        className="block font-medium"
      >
        {label}
      </label>
      <select
        id={`${label.toLowerCase()}-currency`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-2 py-1 ${className}`}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
