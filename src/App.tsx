import { EuiPageTemplate, EuiErrorBoundary, EuiText, EuiCodeBlock, EuiBasicTable, EuiBasicTableColumn } from "@elastic/eui";
import Footer from "./components/Footer";
import dsn_index from "./meta/dsn_index.json";
import SearchBar from "./components/SearchBar";

export interface DSNPhoneObj {
  prefix: number | string;
  number: string;
  location: string;
}

const columns: EuiBasicTableColumn<DSNPhoneObj>[] = [
  {
    field: "prefix",
    name: "DSN Prefix",
    sortable: true,
    render: (prefix: DSNPhoneObj) => (
      <EuiCodeBlock paddingSize="none" language={"ts"} transparentBackground>
        {prefix}
      </EuiCodeBlock>
    ),
  },
  {
    field: "number",
    name: "Phone Number",
    sortable: true,
    render: (number: DSNPhoneObj) => (
      <EuiCodeBlock paddingSize="s" language={"ts"}>
        {String(number)} XXXX
      </EuiCodeBlock>
    ),
  },
  {
    field: "location",
    name: "Location",
    sortable: true,
  },
];

function App() {
  return (
    <EuiErrorBoundary>
      <EuiPageTemplate>
        <EuiText textAlign="center">
          <h3>DSN Converter</h3>
        </EuiText>
        <br />
        <SearchBar />
        <br />
        <EuiText>
          <pre>
            <code>DSN Conversion Table</code>
          </pre>
        </EuiText>
        <EuiBasicTable items={dsn_index} columns={columns} responsive />
        <Footer />
      </EuiPageTemplate>
    </EuiErrorBoundary>
  );
}

export default App;
