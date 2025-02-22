import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencySelect from "../CurrencySelect";
import { getCurrencyCodes } from "../../services/api";

vi.mock("../../services/api", () => ({
  getCurrencyCodes: vi.fn(),
}));

describe("CurrencySelect", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (getCurrencyCodes as unknown as jest.MockedFunction<typeof getCurrencyCodes>).mockResolvedValue(
      ["USD", "EUR", "GBP", "JPY"],
    );
  });

  it("renders with label and fetches currency options", async () => {
    render(<CurrencySelect label="Test Currency" value="USD" onChange={mockOnChange} />);

    expect(screen.getByLabelText("Test Currency")).toBeInTheDocument();

    await waitFor(() => {
      expect(getCurrencyCodes).toHaveBeenCalledTimes(1);
    });

    const select = screen.getByLabelText("Test Currency");
    const options = Array.from(select.getElementsByTagName("option"));
    expect(options).toHaveLength(4);
  });

  it("calls onChange when selection changes", async () => {
    const user = userEvent.setup();
    render(<CurrencySelect label="Test Currency" value="USD" onChange={mockOnChange} />);

    await waitFor(() => {
      expect(getCurrencyCodes).toHaveBeenCalled();
    });

    const select = screen.getByLabelText("Test Currency");
    await user.selectOptions(select, "EUR");

    expect(mockOnChange).toHaveBeenCalledWith("EUR");
  });

  it("handles API errors when fetching currencies", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (getCurrencyCodes as unknown as jest.MockedFunction<typeof getCurrencyCodes>).mockRejectedValue(
      new Error("API Error"),
    );

    render(<CurrencySelect label="Test Currency" value="USD" onChange={mockOnChange} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
