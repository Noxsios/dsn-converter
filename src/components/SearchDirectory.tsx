import { useState } from "react";
import {
  EuiCallOut,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSearchBar,
  QueryType,
  EuiCodeBlock,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiAccordion,
  EuiText,
} from "@elastic/eui";
import dsn_index from "../meta/dsn_index.json";
import { DSNPhoneObj } from "./SearchBar";

const columns: EuiBasicTableColumn<DSNPhoneObj>[] = [
  {
    field: "prefix",
    name: "DSN",
    width: "10%",
    textOnly: true,
    render: (prefix: DSNPhoneObj) => (
      <EuiCodeBlock paddingSize="s" language={"ts"}>
        {prefix}
      </EuiCodeBlock>
    ),
  },
  {
    field: "number",
    name: "Phone Number",
    width: "30%",
    textOnly: true,
    render: (number: DSNPhoneObj) => (
      <EuiCodeBlock paddingSize="s" language={"ts"}>
        {String(number)} XXXX
      </EuiCodeBlock>
    ),
  },
  {
    field: "location",
    name: "Location",
    width: "30%",
    textOnly: true,
    render: (location: DSNPhoneObj) => (
      <EuiText size="xs" color="accent">
        {location}
      </EuiText>
    ),
  },
];

const RenderTable = (props: any) => {
  const query: QueryType = props.query;
  const queriedItems = EuiSearchBar.Query.execute(query, dsn_index);

  return <EuiBasicTable items={queriedItems} columns={columns} tableLayout="auto" responsive />;
};

const SearchDirectory = () => {
  const [query, setQuery] = useState<QueryType>("");
  const blankErr = new Error("blank");
  const [error, setError] = useState(blankErr);

  const onChange = ({ query, error }: any) => {
    if (error) {
      setError(error);
    } else {
      setError(blankErr);
      setQuery(query);
    }
  };

  const renderSearch = () => {
    return (
      <>
        <EuiSpacer size="m" />
        <EuiSearchBar
          query={query}
          box={{
            placeholder: "e.g. Ramstein",
            incremental: true,
          }}
          onChange={onChange}
        />
      </>
    );
  };

  const renderError = () => {
    if (error.message === "blank") {
      return;
    }
    return (
      <>
        <EuiCallOut iconType="faceSad" color="danger" title={`Invalid search: ${error.message}`} />
        <EuiSpacer size="l" />
      </>
    );
  };

  const content = renderError() || <RenderTable query={query} />;

  return (
    <EuiAccordion id="dsn-conversion-table-accordion" buttonContent="Phonebook" paddingSize="xs" arrowDisplay="right">
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem>{renderSearch()}</EuiFlexItem>
      </EuiFlexGroup>
      {content}
    </EuiAccordion>
  );
};

export default SearchDirectory;
