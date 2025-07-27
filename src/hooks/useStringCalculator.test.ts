import { renderHook, act } from "@testing-library/react";
import { useStringCalculator } from "./useStringCalculator";

const setupCalculator = (initialInput: string) => {
  const { result } = renderHook(() => useStringCalculator());

  act(() => {
    result.current.setInput(initialInput);
  });
  act(() => {
    result.current.calculate();
  });

  return result;
};

describe("useStringCalculator", () => {
  describe("Basic Functionality", () => {
    it("should return 0 for an empty string", () => {
      const result = setupCalculator("");
      expect(result.current.result).toBe(0);
    });

    it("should return the number itself for a single number", () => {
      const result = setupCalculator("1");
      expect(result.current.result).toBe(1);
    });

    it("should return the sum of two comma separated numbers", () => {
      const result = setupCalculator("1,2");
      expect(result.current.result).toBe(3);
    });

    it("should return the sum of multiple comma separated numbers", () => {
      const result = setupCalculator("1,2,3,4,5");
      expect(result.current.result).toBe(15);
    });
  });

  describe("Delimiter Handling", () => {
    it("should handle new lines between numbers", () => {
      const result = setupCalculator("1\n2,3");
      expect(result.current.result).toBe(6);
    });

    it("should support a custom delimiter specified at the start", () => {
      const result = setupCalculator("//;\n1;2");
      expect(result.current.result).toBe(3);
    });
  });

  describe("Error Handling", () => {
    it("should set an error message for a single negative number", () => {
      const result = setupCalculator("1,-2,3");

      expect(result.current.error).toBe("negatives not allowed: -2");
      expect(result.current.result).toBeNull();
    });

    it("should include all negative numbers in the error message", () => {
      const result = setupCalculator("1,-2,-3");

      expect(result.current.error).toBe("negatives not allowed: -2,-3");
      expect(result.current.result).toBeNull();
    });
  });
});
