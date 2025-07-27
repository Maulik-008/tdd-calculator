import { useState } from "react";

interface CalculatorState {
  result: number | null;
  error: string | null;
}

const initialState: CalculatorState = {
  result: null,
  error: null,
};

export function useStringCalculator() {
  const [input, setInput] = useState("");
  const [resultState, setResultState] = useState<CalculatorState>(initialState);

  const add = (numbers: string): number => {
    if (!numbers) {
      return 0;
    }

    let delimiter: string | RegExp = /[\n,]/;
    let numbersPart = numbers;

    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      const delimiterLine = parts[0];
      delimiter = delimiterLine.substring(2);
      numbersPart = parts[1];
    }

    const numberArray = numbersPart.split(delimiter);

    const negatives = numberArray
      .map((num) => parseInt(num, 10))
      .filter((num) => num < 0);

    if (negatives.length > 0) {
      throw new Error(`negatives not allowed: ${negatives.join(",")}`);
    }

    const sum = numberArray.reduce((total, numStr) => {
      const num = parseInt(numStr, 10) || 0;
      return total + num;
    }, 0);

    return sum;
  };

  const calculate = () => {
    try {
      const res = add(input);
      setResultState({ result: res, error: null });
    } catch (err) {
      setResultState({ result: null, error: (err as Error).message });
    }
  };

  const reset = () => {
    setInput("");
    setResultState(initialState);
  };

  return {
    input,
    setInput,
    result: resultState.result,
    error: resultState.error,
    calculate,
    reset,
  };
}
