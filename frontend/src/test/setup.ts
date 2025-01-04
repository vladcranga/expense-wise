import { expect, afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import axios from "axios";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock fetch globally
global.fetch = vi.fn(
  () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    }) as Promise<Response>,
);

// Mock axios
vi.mock("axios");

beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();
  localStorageMock.getItem.mockReset();
  localStorageMock.setItem.mockReset();
  localStorageMock.removeItem.mockReset();
  localStorageMock.clear.mockReset();

  // Reset axios mocks
  (axios.get as any).mockReset();
  (axios.post as any).mockReset();
  (axios.put as any).mockReset();
  (axios.delete as any).mockReset();
});

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
