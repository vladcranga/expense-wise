import React from 'react';
import CurrencyConverter from '../CurrencyConverter';

const ConverterPage: React.FC = () => {
    return (
        <div className="container mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Currency Converter
                </h1>
                <CurrencyConverter />
            </div>
        </div>
    );
};

export default ConverterPage;
