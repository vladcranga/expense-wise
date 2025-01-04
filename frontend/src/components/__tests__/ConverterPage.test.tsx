import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConverterPage from "../dashboard/ConverterPage";

// Mock the CurrencyConverter component
vi.mock("../CurrencyConverter", () => ({
  default: () => (
    <div data-testid="mock-currency-converter">
      Currency Converter Component
    </div>
  ),
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

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("ConverterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === "baseCurrency") return "USD";
      return null;
    });
  });

  it("renders the currency converter page with title", () => {
    render(<ConverterPage />);

    expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    expect(screen.getByTestId("mock-currency-converter")).toBeInTheDocument();
  });
});
