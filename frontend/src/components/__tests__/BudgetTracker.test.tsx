import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BudgetTracker from "../BudgetTracker";
import axios from "axios";

// Mock child components to avoid their initialization
vi.mock("../CurrencyConverter", () => ({
  default: () => <div data-testid="mock-currency-converter">Currency Converter</div>,
}));

vi.mock("../CategoryChart", () => ({
  default: () => <div data-testid="mock-category-chart">Category Chart</div>,
}));

// Mock axios
vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("BudgetTracker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === "baseCurrency") return "USD";
      if (key === "userId") return "1";
      return null;
    });

    // Mock the initial expenses fetch
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
  });

  it("loads expenses on mount", async () => {
    const mockExpenses = [
      {
        id: 1,
        description: "Groceries",
        category: "Food",
        amount: 50,
        currency: "USD",
        date: "2024-01-15",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockExpenses });

    render(<BudgetTracker />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8080/api/v1/expenses/1");
    });
  });

  it("renders essential components", () => {
    render(<BudgetTracker />);

    // Check for main sections
    expect(screen.getByText("Add Expenses")).toBeInTheDocument();
    expect(screen.getByText("Expenses by Category")).toBeInTheDocument();
    expect(screen.getByText("Your Expenses")).toBeInTheDocument();
  });
});
