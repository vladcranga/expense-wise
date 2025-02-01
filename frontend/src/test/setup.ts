import { expect, afterEach, beforeEach, vi, Mock } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import axios from "axios";

// Extend Vitest's expect method with methods from react-testing-library
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
  (axios.get as Mock<typeof axios.get>).mockReset();
  (axios.post as Mock<typeof axios.post>).mockReset();
  (axios.put as Mock<typeof axios.put>).mockReset();
  (axios.delete as Mock<typeof axios.delete>).mockReset();
});

// Run a cleanup after each test case
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
