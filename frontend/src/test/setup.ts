import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
});

// mock fetch globally
global.fetch = vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  }) as Promise<Response>
);