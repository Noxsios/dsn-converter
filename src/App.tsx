import { EuiPageTemplate, EuiErrorBoundary, EuiText, EuiSpacer } from "@elastic/eui";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import ConversionTable from "./components/ConversionTable";

function App() {
  return (
    <EuiErrorBoundary>
      <EuiPageTemplate template="centeredBody">
        <EuiText textAlign="center">
          <h2>DSN Converter</h2>
        </EuiText>
        <EuiSpacer size="m" />
        <SearchBar />
        <EuiSpacer size="m" />
        <ConversionTable />
        <EuiSpacer size="m" />
        <Footer />
      </EuiPageTemplate>
    </EuiErrorBoundary>
  );
}

export default App;
