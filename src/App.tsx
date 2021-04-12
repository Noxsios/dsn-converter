import { EuiErrorBoundary, EuiText } from "@elastic/eui";
import Footer from "./information/Footer";

function App() {
  return (
    <EuiErrorBoundary>
      <EuiText>
        <pre>
          <code>Hello there.</code>
        </pre>
      </EuiText>
      <Footer />
    </EuiErrorBoundary>
  );
}

export default App;
