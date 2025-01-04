import React, { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import { calculate } from "../../services/api";
import Footer from "../shared/Footer";

type Operation = "+" | "-" | "*" | "/" | "÷" | undefined;
type HistoryEntry = string;

const CalculatorPage: React.FC = () => {
  // state hooks
  const [current, setCurrent] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");
  const [operation, setOperation] = useState<Operation>(undefined);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // constants
  const MAX_HISTORY_SIZE = 10;

  // clear the current input
  const clear = () => {
    setCurrent("");
    setPrevious("");
    setOperation(undefined);
  };

  // clear the calculation history
  const clearHistory = () => {
    setHistory([]);
  };

  const updateHistory = (
    operationType: string,
    num1: number,
    num2: number | null,
    result: number | string,
  ) => {
    const historyEntry =
      num2 !== null
        ? `${num1} ${operationType} ${num2} = ${result}`
        : `${operationType}(${num1}) = ${result}`;

    setHistory((prevHistory) => {
      const updatedHistory = [historyEntry, ...prevHistory];
      return updatedHistory.length > MAX_HISTORY_SIZE
        ? updatedHistory.slice(0, MAX_HISTORY_SIZE)
        : updatedHistory;
    });
  };

  const deleteNumber = useCallback(() => {
    setCurrent((prev) => prev.slice(0, -1));
  }, []);

  const addNumber = useCallback(
    (number: string | number) => {
      if (number === "." && current.includes(".")) return;
      setCurrent((prev) => prev.toString() + number.toString());
    },
    [current],
  );

  const computeRegularOperation = useCallback(
    debounce(async () => {
      if (current === "" || previous === "") {
        alert("Enter two numbers and an operation before calculating.");
        return;
      }

      try {
        const num1 = parseFloat(previous);
        const num2 = parseFloat(current);
        const result = await calculate(
          operation as string,
          num1.toString(),
          num2.toString(),
        );
        const formattedResult = Number.isInteger(result)
          ? result.toString()
          : result.toFixed(3);

        setCurrent(formattedResult);
        setPrevious("");
        setOperation(undefined);

        updateHistory(operation as string, num1, num2, formattedResult);
      } catch (error) {
        console.error("Error during calculation:", error);
      }
    }, 500),
    [current, previous, operation],
  );

  const chooseOperation = useCallback(
    (op: Operation) => {
      if (current === "") return;
      if (previous !== "") {
        computeRegularOperation();
      }
      setOperation(op);
      setPrevious(current);
      setCurrent("");
    },
    [current, previous, computeRegularOperation],
  );

  const keyMap = useMemo(
    () => ({
      "1": () => addNumber("1"),
      "2": () => addNumber("2"),
      "3": () => addNumber("3"),
      "4": () => addNumber("4"),
      "5": () => addNumber("5"),
      "6": () => addNumber("6"),
      "7": () => addNumber("7"),
      "8": () => addNumber("8"),
      "9": () => addNumber("9"),
      "0": () => addNumber("0"),
      ".": () => addNumber("."),
      ",": () => addNumber("."),
      "+": () => chooseOperation("+"),
      "-": () => chooseOperation("-"),
      "*": () => chooseOperation("*"),
      "/": () => chooseOperation("/"),
      "%": () => chooseOperation("/"),
      "=": () => computeRegularOperation(),
      Enter: () => computeRegularOperation(),
      Backspace: () => deleteNumber(),
      Delete: () => deleteNumber(),
      c: () => clear(),
      C: () => clear(),
    }),
    [addNumber, chooseOperation, computeRegularOperation, deleteNumber],
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const action = keyMap[event.key as keyof typeof keyMap];
      if (action) action();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [keyMap]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4">
            {/* Screen */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3 shadow-inner">
              <div className="text-right text-gray-600 text-base mb-1">
                {previous} {operation}
              </div>
              <div className="text-right text-xl font-semibold text-gray-800">
                {current || "0"}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={clear}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md col-span-2"
              >
                Clear
              </button>
              <button
                onClick={deleteNumber}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md col-span-2"
              >
                Delete
              </button>

              <button
                onClick={() => addNumber("7")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                7
              </button>
              <button
                onClick={() => addNumber("8")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                8
              </button>
              <button
                onClick={() => addNumber("9")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                9
              </button>
              <button
                onClick={() => chooseOperation("÷")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                ÷
              </button>

              <button
                onClick={() => addNumber("4")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                4
              </button>
              <button
                onClick={() => addNumber("5")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                5
              </button>
              <button
                onClick={() => addNumber("6")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                6
              </button>
              <button
                onClick={() => chooseOperation("*")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                ×
              </button>

              <button
                onClick={() => addNumber("1")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                1
              </button>
              <button
                onClick={() => addNumber("2")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                2
              </button>
              <button
                onClick={() => addNumber("3")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                3
              </button>
              <button
                onClick={() => chooseOperation("-")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                -
              </button>

              <button
                onClick={() => addNumber("0")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 col-span-2"
              >
                0
              </button>
              <button
                onClick={() => addNumber(".")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                .
              </button>
              <button
                onClick={() => chooseOperation("+")}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                +
              </button>

              <button
                onClick={computeRegularOperation}
                className="py-3 px-4 rounded-lg font-medium text-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md col-span-4"
              >
                =
              </button>
            </div>
          </div>
        </div>

        {/* History Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">History</h2>
              <button
                onClick={clearHistory}
                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 font-medium"
              >
                Clear History
              </button>
            </div>
            <div className="space-y-2">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-50 rounded-lg text-gray-700 text-base"
                >
                  {entry}
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-gray-500 text-center py-4">
                  No calculations yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
