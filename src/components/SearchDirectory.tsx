import {
  EuiAccordion,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiCallOut,
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSearchBar,
  EuiSpacer,
  EuiText,
  QueryType,
  CriteriaWithPagination,
} from "@elastic/eui";

import { DSNPhoneObj } from "./SearchBar";
import dsn_index from "../meta/dsn_index.json";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

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
  const [items, setItems] = useState<DSNPhoneObj[]>(dsn_index);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const debouncedQuery = debounce(() => setItems(EuiSearchBar.Query.execute(query, dsn_index)), 500);
    debouncedQuery();
  }, [query]);

  const onTableChange = (criteria: CriteriaWithPagination<DSNPhoneObj>) => {
    const { index, size } = criteria.page;
    setPageIndex(index);
    setPageSize(size);
  };

  const totalItemCount = items.length;

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [5, 25, 50],
  };

  const pageStart = pageIndex * pageSize;

  const pageEnd = pageStart + pageSize;

  const pageOfItems = items.slice(pageStart, pageEnd);

  return <EuiBasicTable items={pageOfItems} columns={columns} onChange={onTableChange} pagination={pagination} tableLayout="auto" responsive />;
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
