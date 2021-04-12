import { EuiErrorBoundary, EuiText } from "@elastic/eui";

function App() {
  return (
    <EuiErrorBoundary>
      <EuiText>
        <pre>
          <code>Hello there.</code>
        </pre>
      </EuiText>
    </EuiErrorBoundary>
  );
}

export default App;
