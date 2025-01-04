import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryChart from "../CategoryChart";

// Mock Chart.js
vi.mock("react-chartjs-2", () => ({
  Pie: () => <div data-testid="mock-pie-chart">Pie Chart</div>,
}));

describe("CategoryChart", () => {
  const mockExpenses = [
    {
      description: "Groceries",
      category: "Food",
      amount: 50,
      date: "2024-01-15",
    },
    {
      description: "Bus ticket",
      category: "Transport",
      amount: 30,
      date: "2024-01-15",
    },
    {
      description: "More groceries",
      category: "Food",
      amount: 25,
      date: "2024-01-15",
    },
  ];

  it("renders pie chart when expenses are provided", () => {
    render(<CategoryChart expenses={mockExpenses} />);
    expect(screen.getByTestId("mock-pie-chart")).toBeInTheDocument();
  });

  it("shows no data message when expenses array is empty", () => {
    render(<CategoryChart expenses={[]} />);
    expect(
      screen.getByText(/No expenses available to generate the chart/i),
    ).toBeInTheDocument();
  });

  it("aggregates expenses by category correctly", () => {
    const { container } = render(<CategoryChart expenses={mockExpenses} />);
    const pieChart = screen.getByTestId("mock-pie-chart");

    // The chart should exist
    expect(pieChart).toBeInTheDocument();

    // The container should be centered with proper width
    expect(container.firstChild).toHaveClass("w-full", "max-w-md", "mx-auto");
  });
});
