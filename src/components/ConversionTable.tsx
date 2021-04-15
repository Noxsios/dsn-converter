import { EuiCodeBlock, EuiBasicTable, EuiBasicTableColumn, EuiAccordion, EuiText } from "@elastic/eui";
import dsn_index from "../meta/dsn_index.json";
import { DSNPhoneObj } from "./SearchBar";

const columns: EuiBasicTableColumn<DSNPhoneObj>[] = [
  {
    field: "prefix",
    name: "DSN Prefix",
    sortable: true,
    render: (prefix: DSNPhoneObj) => (
      <EuiCodeBlock paddingSize="s" language={"ts"}>
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
    render: (location: DSNPhoneObj) => (
      <EuiText size="xs" color="accent">
        {location}
      </EuiText>
    ),
  },
];

const ConversionTable = () => {
  return (
    <EuiAccordion id="dsn-conversion-table-accordion" buttonContent="DSN Conversion Table">
      <EuiBasicTable items={dsn_index} columns={columns} responsive />
    </EuiAccordion>
  );
};

export default ConversionTable;
