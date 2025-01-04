import React from "react";
import { ConversionResult as ConversionResultType } from "../types";

interface ConversionResultProps {
  result: ConversionResultType;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ result }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <p>
        <span className="font-medium">Result:</span>{" "}
        {result.convertedAmount.toFixed(2)} {result.toCurrency}
      </p>
      <p>
        <span className="font-medium">Exchange Rate:</span> 1{" "}
        {result.fromCurrency} = {result.exchangeRate.toFixed(4)}{" "}
        {result.toCurrency}
      </p>
    </div>
  );
};

export default ConversionResult;
