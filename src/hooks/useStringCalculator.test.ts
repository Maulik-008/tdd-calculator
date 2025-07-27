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
    expect(result.current.error).toBeNull();
  });
});
