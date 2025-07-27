import { useState } from "react";

export function useStringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const add = (numbers: string): number => {
    if (!numbers) return 0;

    if (numbers.includes(",") || numbers.includes("\n")) {
      const numberArray = numbers.split(/[\n,]/);

      const getSum =
        numberArray.length > 1
          ? numberArray.reduce(
              (sum, current) => sum + (current ? parseInt(current, 10) : 0),
              0
            )
          : 0;
      return getSum;
    }
    return Number(numbers);
  };

  const calculate = () => {
    try {
      const res = add(input);
      setResult(res);
      setError(null);
    } catch (err) {
      setResult(null);
      setError((err as Error).message);
    }
  };

  return {
    input,
    setInput,
    result,
    error,
    calculate,
  };
}
