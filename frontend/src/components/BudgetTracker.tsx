import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CategoryChart from './CategoryChart';
import Footer from './shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Expense {
    id: number;
    description: string;
    category: string;
    amount: number;
    currency: string;
    date: string;
}

interface EditingExpense extends Expense {
    isEditing?: boolean;
}

// Get current year and month
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth(); // 0-11

const BudgetTracker: React.FC = () => {
    const [baseCurrency, setBaseCurrency] = useState(localStorage.getItem('baseCurrency') || 'USD');
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        amount: '',
        currency: localStorage.getItem('baseCurrency') || 'USD',
        date: '',
    });
    const [expenses, setExpenses] = useState<EditingExpense[]>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<EditingExpense[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isExpenseListExpanded, setIsExpenseListExpanded] = useState(false);
    const [editingExpense, setEditingExpense] = useState<EditingExpense | null>(null);
    const toggleExpenseList = () => setIsExpenseListExpanded(!isExpenseListExpanded);
    const userId = localStorage.getItem('userId');

    // Generate array of last 12 months
    const last12Months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(currentMonth - i);
        return {
            month: date.getMonth(),
            year: date.getFullYear(),
            label: date.toLocaleString('default', { month: 'long', year: 'numeric' })
        };
    });

    // Filter expenses based on selected month and sort by date (most recent first)
    useEffect(() => {
        const filtered = expenses
            .filter(expense => {
                if (!expense?.date) return false;
                // Parse date string in YYYY-MM-DD format
                const [year, month] = expense.date.split('-');
                // Convert 1-based month to 0-based for comparison
                return parseInt(month) - 1 === selectedMonth && parseInt(year) === selectedYear;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setFilteredExpenses(filtered);
    }, [expenses, selectedMonth, selectedYear]);

    // Handle month selection
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [month, year] = e.target.value.split('-').map(Number);
        setSelectedMonth(month);
        setSelectedYear(year);
    };

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const formatDate = (date: string) => {
        if (date.includes('-')) {
            return date;
        }
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formattedDate = formatDate(formData.date);
            const expenseData = {
                description: formData.description,
                category: formData.category,
                amount: parseFloat(formData.amount),
                currency: formData.currency,
                date: formattedDate,
                userId,
            };

            const response = await axios.post('http://localhost:8080/api/v1/expenses', expenseData);

            // Create the new expense with all required fields
            const newExpense = {
                id: response.data.id,
                description: formData.description,
                category: formData.category,
                amount: parseFloat(formData.amount),
                currency: formData.currency,
                date: formattedDate,
            };

            // Update expenses state with the new expense
            setExpenses(prevExpenses => [...prevExpenses, newExpense]);
            setEditingExpense(null);
            
            // Reset form
            setFormData({ 
                description: '', 
                category: '', 
                amount: '', 
                currency: localStorage.getItem('baseCurrency') || 'USD', 
                date: '' 
            });

            toast.success('Expense added successfully!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Failed to add expense', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
            });
            console.error('Error adding expense:', error);
        }
    };

    const handleRemoveExpense = async (expenseId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/expenses/${expenseId}`);
            setExpenses(expenses.filter((expense) => expense.id !== expenseId));
        } catch (error) {
            console.error("Error removing expense:", error);
        }
    };

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense({
            ...expense,
            isEditing: true
        });
    };

    const handleCancelEdit = () => {
        setEditingExpense(null);
    };

    const handleUpdateExpense = async () => {
        if (!editingExpense) return;
        
        try {
            await axios.put(`http://localhost:8080/api/v1/expenses/${editingExpense.id}`, {
                ...editingExpense,
                userId,
            });
            
            // Update local state
            setExpenses(prevExpenses => 
                prevExpenses.map(expense => 
                    expense.id === editingExpense.id ? { ...editingExpense, isEditing: false } : expense
                )
            );
            
            setEditingExpense(null);
            toast.success('Expense updated successfully!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
            });
        } catch (error) {
            toast.error('Failed to update expense', {
                position: "bottom-right",
                autoClose: 3000,
            });
            console.error('Error updating expense:', error);
        }
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editingExpense) return;
        
        setEditingExpense({
            ...editingExpense,
            [e.target.name]: e.target.value,
        });
    };

    const fetchExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/expenses/${userId}`);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    useEffect(() => {
        const storedBaseCurrency = localStorage.getItem('baseCurrency');
        if (storedBaseCurrency) {
            setBaseCurrency(storedBaseCurrency);
            setFormData(prev => ({ ...prev, currency: storedBaseCurrency }));
        }
    }, []);

    const displayCurrency = localStorage.getItem('baseCurrency') || baseCurrency;

    const calculateMonthlyTotal = useCallback(() => {
        if (!expenses?.length) return 0;
        
        const currentMonthExpenses = expenses.filter(expense => {
            if (!expense?.date) return false;
            try {
                const [year, month] = expense.date.split('-');
                return parseInt(month) - 1 === selectedMonth && parseInt(year) === selectedYear;
            } catch (error) {
                console.error('Error parsing date:', expense.date, error);
                return false;
            }
        });

        return currentMonthExpenses.reduce((total, expense) => 
            total + (typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount)
        , 0);
    }, [expenses, selectedMonth, selectedYear]);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
                {/* Expense Submission Form and Month Selector with Graph */}
                <div className="flex flex-row space-x-8">
                    {/* Expense Submission Form */}
                    <div className="flex-1 bg-gray-100 p-4 rounded shadow">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Add Expenses</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
                            <div>
                                <label className="text-gray-700">Description:</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Category:</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Accommodation">Accommodation</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Food">Food</option>
                                    <option value="Gifts">Gifts</option>
                                    <option value="Health">Health</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Transport">Transport</option>
                                </select>
                            </div>
                            <div>
                                <label className="flex text-gray-700">Amount:</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="amount"
                                    value={formData.amount}
                                    onKeyDown={(e) => {
                                        if (e.key === "-") {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700">Currency:</label>
                                <input
                                    type="text"
                                    disabled
                                    value={displayCurrency}
                                    className="px-3 py-2 rounded border-0 focus:ring-0"
                                >
                                </input>
                                <p className="w-full px-3 py-2 text-gray-700">
                                    Use the currency converter for expenses made
                                    outside of your base currency, {displayCurrency}.
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-700">Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormData({ ...formData, date: e.target.value })
                                    }
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg
                                    shadow hover:bg-blue-600 transition-all duration-300"
                            >
                                Add Expense
                            </button>
                        </form>
                    </div>
                    {/* Month Selector and Graph */}
                    <div className="flex-1 bg-gray-100 p-4 rounded shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-700">Expenses by Category</h2>
                            <select
                                value={`${selectedMonth}-${selectedYear}`}
                                onChange={handleMonthChange}
                                className="px-4 py-2 border rounded-lg bg-white"
                            >
                                {last12Months.map(({ month, year, label }) => (
                                    <option key={`${month}-${year}`} value={`${month}-${year}`}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {calculateMonthlyTotal() > 0 && (
                            <p className="text-lg text-gray-700 mb-4 text-end">
                                Your monthly expenses: {calculateMonthlyTotal().toFixed(2)} {displayCurrency}
                            </p>
                        )}
                        {filteredExpenses.length > 0 ? (
                            <CategoryChart expenses={filteredExpenses} />
                        ) : (
                            <p className="text-gray-500 text-center py-8">
                                No expenses found for {new Date(
                                    selectedYear, selectedMonth).toLocaleString(
                                        'default', { month: 'long', year: 'numeric' })}.
                            </p>
                        )}
                    </div>
                </div>

                {/* Expense List */}
                <div className="bg-gray-100 p-4 rounded shadow">
                    <div
                        className="cursor-pointer flex justify-between items-center"
                        onClick={toggleExpenseList}
                    >
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Expenses</h2>
                        <span
                            className={`transform transition-transform ${isExpenseListExpanded ? 'rotate-90' : ''
                                } text-2xl`}
                        >
                            ➤
                        </span>
                    </div>
                    {isExpenseListExpanded && (
                        <div className="space-y-4">
                            {filteredExpenses.length > 0 ? (
                                filteredExpenses.map((expense) => (
                                    <div key={expense.id} className="bg-white p-4 rounded shadow">
                                        {editingExpense && editingExpense.id === expense.id ? (
                                            // Edit mode
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={editingExpense.description}
                                                    onChange={handleEditInputChange}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                                <select
                                                    name="category"
                                                    value={editingExpense.category}
                                                    onChange={handleEditInputChange}
                                                    className="w-full px-2 py-1 border rounded"
                                                >
                                                    <option value="Accommodation">Accommodation</option>
                                                    <option value="Bills">Bills</option>
                                                    <option value="Entertainment">Entertainment</option>
                                                    <option value="Food">Food</option>
                                                    <option value="Gifts">Gifts</option>
                                                    <option value="Health">Health</option>
                                                    <option value="Shopping">Shopping</option>
                                                    <option value="Transport">Transport</option>
                                                </select>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    value={editingExpense.amount}
                                                    onChange={handleEditInputChange}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={editingExpense.date}
                                                    onChange={handleEditInputChange}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={handleUpdateExpense}
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View mode
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold">{expense.description}</p>
                                                    <p className="text-sm text-gray-600">{expense.category}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {expense.amount} {expense.currency}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(expense.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEditExpense(expense)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveExpense(expense.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    No expenses found for {new Date(
                                        selectedYear, selectedMonth).toLocaleString(
                                            'default', { month: 'long', year: 'numeric' })}.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default BudgetTracker;
