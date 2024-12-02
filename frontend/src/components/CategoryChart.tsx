import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
    description: string;
    category: string;
    amount: number;
    date: string;
}

interface Props {
    expenses: Expense[];
}

const CATEGORY_COLORS: Record<string, string> = {
    Food: '#FF5252',          // Red
    Gifts: '#2511B4',         // Deep Blue
    Shopping: '#FFCE56',      // Warm Yellow
    Entertainment: '#4BC0C0',  // Turquoise
    Bills: '#9966FF',         // Purple
    Transport: '#FF9F40',     // Orange
    Health: '#F7B2FA',        // Pink
    Accommodation: '#2196F3'   // Sky Blue
};

const CategoryChart: React.FC<Props> = ({ expenses }) => {
    const aggregateExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
        const categoryTotals: Record<string, number> = {};

        expenses.forEach((expense) => {
            const { category, amount } = expense;
            if (categoryTotals[category]) {
                categoryTotals[category] += amount;
            } else {
                categoryTotals[category] = amount;
            }
        });

        return categoryTotals;
    };

    const categoryTotals = aggregateExpensesByCategory(expenses);

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Category Expenses',
                data: Object.values(categoryTotals),
                backgroundColor: Object.keys(categoryTotals).map(category => 
                    CATEGORY_COLORS[category] || '#808080' // Fallback gray color
                ),
                hoverOffset: 4,
            },
        ],
    };

    const hasData = Object.keys(categoryTotals).length > 0;

    return (
        <div className="w-full max-w-md mx-auto">
            {hasData ? (
                <>
                    <Pie data={data} />
                </>
            ) : (
                <p className="text-center text-red-500">
                    No expenses available to generate the chart.
                </p>
            )}
        </div>
    );
};

export default CategoryChart;
