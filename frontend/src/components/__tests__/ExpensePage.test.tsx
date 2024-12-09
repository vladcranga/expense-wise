import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpensePage from '../dashboard/ExpensePage';

// Mock the BudgetTracker component
vi.mock('../BudgetTracker', () => ({
    default: () => <div data-testid="mock-budget-tracker">Budget Tracker Component</div>
}));

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
    removeItem: vi.fn(),
    length: 0,
    key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

describe('ExpensePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockLocalStorage.getItem.mockImplementation((key) => {
            switch (key) {
                case 'baseCurrency':
                    return 'USD';
                case 'userId':
                    return '1';
                default:
                    return null;
            }
        });
    });

    it('renders the budget tracker component', () => {
        render(<ExpensePage />);
        expect(screen.getByTestId('mock-budget-tracker')).toBeInTheDocument();
    });
});
