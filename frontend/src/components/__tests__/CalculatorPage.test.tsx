import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import { calculate } from "../../services/api";

// Mock the API call
vi.mock("../../services/api", () => ({
  calculate: vi.fn(),
}));

// Mock the Footer component
vi.mock("../shared/Footer", () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

// Create a test hook that mimics the calculator's state logic
const useCalculatorState = () => {
  const [current, setCurrent] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");
  const [operation, setOperation] = useState<string | undefined>(undefined);
  const [history, setHistory] = useState<string[]>([]);

  const addNumber = (number: string) => {
    if (number === "." && current.includes(".")) return;
    setCurrent((prev) => prev.toString() + number.toString());
  };

  const chooseOperation = (op: string) => {
    if (current === "") return;
    setOperation(op);
    setPrevious(current);
    setCurrent("");
  };

  const clear = () => {
    setCurrent("");
    setPrevious("");
    setOperation(undefined);
  };

  const deleteNumber = () => {
    setCurrent((prev) => prev.slice(0, -1));
  };

  const computeRegularOperation = async () => {
    if (current === "" || previous === "") {
      return;
    }

    const num1 = parseFloat(previous);
    const num2 = parseFloat(current);

    if (operation === "÷" && num2 === 0) {
      setCurrent("Cannot divide by zero");
      return;
    }

    const result = await calculate(operation as string, num1.toString(), num2.toString());
    const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(3);

    setCurrent(formattedResult);
    setPrevious("");
    setOperation(undefined);

    setHistory((prev) =>
      [`${num1} ${operation} ${num2} = ${formattedResult}`, ...prev].slice(0, 10),
    );
  };

  return {
    current,
    previous,
    operation,
    history,
    addNumber,
    chooseOperation,
    clear,
    deleteNumber,
    computeRegularOperation,
  };
};

describe("Calculator Logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Operations", () => {
    it("handles decimal numbers correctly", () => {
      const { result } = renderHook(() => useCalculatorState());

      act(() => {
        result.current.addNumber("1");
        result.current.addNumber(".");
        result.current.addNumber("5");
      });

      expect(result.current.current).toBe("1.5");

      // Should not add multiple decimal points
      act(() => {
        result.current.addNumber(".");
      });

      expect(result.current.current).toBe("1.5");
    });

    it("clears calculator state correctly", () => {
      const { result } = renderHook(() => useCalculatorState());

      act(() => {
        result.current.addNumber("5");
        result.current.chooseOperation("+");
        result.current.addNumber("3");
        result.current.clear();
      });

      expect(result.current.current).toBe("");
      expect(result.current.previous).toBe("");
      expect(result.current.operation).toBe(undefined);
    });

    it("handles delete operation correctly", () => {
      const { result } = renderHook(() => useCalculatorState());

      act(() => {
        result.current.addNumber("1");
        result.current.addNumber("2");
        result.current.addNumber("3");
        result.current.deleteNumber();
      });

      expect(result.current.current).toBe("12");
    });
  });
});
