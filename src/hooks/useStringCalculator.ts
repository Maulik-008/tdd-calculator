import { useState } from "react";

export function useStringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const add = (numbers: string): number => {
    if (!numbers) return 0;

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
