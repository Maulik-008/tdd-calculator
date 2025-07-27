import { useStringCalculator } from "../hooks/useStringCalculator";

export default function StringCalculator() {
  const { input, setInput, result, error, calculate } = useStringCalculator();

  return (
    <div className="calculator-container">
      <h2>String Calculator</h2>
      <textarea
        rows={3}
        style={{ width: "100%", marginBottom: "1rem" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="1,2,3"
      />
      <button onClick={calculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
