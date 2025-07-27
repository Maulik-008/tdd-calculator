import { useStringCalculator } from "../hooks/useStringCalculator";

export default function StringCalculator() {
  const { input, setInput, result, error, calculate, reset } =
    useStringCalculator();

  return (
    <div className="calculator-wrapper">
      <div className="calculator-card">
        <header className="calculator-header">
          <h1>String Calculator</h1>
        </header>

        <div className="input-area">
          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 1,2\n3 or //;\n1;2"
            className="calculator-textarea"
          />
          <div className="button-container">
            <button onClick={calculate} className="calculate-button">
              Calculate Sum
            </button>
            <button onClick={reset} className="reset-button">
              Reset
            </button>
          </div>
        </div>

        {(result !== null || error) && (
          <div className="output-area">
            {error && (
              <div className="result-display error">
                <strong>Error:</strong> {error}
              </div>
            )}
            {result !== null && !error && (
              <div className="result-display success">
                <span>Result</span>
                <strong className="result-value">{result}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
