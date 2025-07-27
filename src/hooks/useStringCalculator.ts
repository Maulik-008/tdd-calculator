import { useState } from "react";

export function useStringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const add = (numbers: string): number => {
    if (!numbers) return 0;

    let delimiter: string | RegExp = /,|\n/;
    let numbersPart = numbers;

    if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf("\n");
      delimiter = numbers.substring(2, delimiterEndIndex);
      numbersPart = numbers.substring(delimiterEndIndex + 1);
    }

    const numberArray = numbersPart.split(delimiter);

    const negatives = numberArray.filter((n) => parseInt(n, 10) < 0);

    if (negatives.length > 0) {
      throw new Error(`negatives not allowed: ${negatives.join(",")}`);
    }

    const getSum =
      numberArray.length > 1
        ? numberArray.reduce(
            (sum, current) => sum + (current ? parseInt(current, 10) : 0),
            0
          )
        : Number(numbers);
    return getSum;
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
