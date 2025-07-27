import { renderHook, act } from "@testing-library/react";
import { useStringCalculator } from "./useStringCalculator";

describe("useStringCalculator", () => {
  it("returns 0 for empty input", () => {
    const { result } = renderHook(() => useStringCalculator());

    act(() => {
      result.current.setInput("");
      result.current.calculate();
    });

    expect(result.current.result).toBe(0);
  });

  it("should return the number itself for a single number input", async () => {
    const { result } = renderHook(() => useStringCalculator());

    act(() => {
      result.current.setInput("1");
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.result).toBe(1);
  });
  it("should return the sum of two comma-separated numbers", () => {
    const { result } = renderHook(() => useStringCalculator());

    act(() => {
      result.current.setInput("1,2");
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.result).toBe(3);
  });
  it("should return the sum of multiple comma-separated numbers", () => {
    const { result } = renderHook(() => useStringCalculator());

    act(() => {
      result.current.setInput("1,2,3,4,5");
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.result).toBe(15);
  });
});
