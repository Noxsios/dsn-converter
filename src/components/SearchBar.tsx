import { EuiCodeBlock, EuiFieldSearch, EuiButton } from "@elastic/eui";
import { useState, ChangeEvent, useEffect } from "react";
import dsn_index from "../meta/dsn_index.json";
import _ from "lodash";

export interface DSNPhoneObj {
  prefix: number | string;
  number: string;
  location: string;
  fullNumber?: string;
}

const searchDSN = (prefix: number | string): DSNPhoneObj => {
  if (typeof prefix === "number") {
    return dsn_index.filter((ele) => ele.prefix === prefix)[0];
  } else {
    return dsn_index.filter((ele) => ele.prefix === Number(prefix))[0];
  }
};

const debounceInput = _.debounce((num: any) => num, 500);

const SearchBar = () => {
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [searchedDSN, setSearchedDSN] = useState<DSNPhoneObj>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const text: string = e.target.value;

    setSearchedDSN(searchDSN(text.slice(0, 3)));
    setPhoneNum(text);
  };

  useEffect(() => {
    debounceInput(phoneNum);
  }, [phoneNum]);

  return (
    <>
      <EuiFieldSearch value={phoneNum} onChange={handleChange} fullWidth />
      {phoneNum.includes("-") && !!searchedDSN && phoneNum.split("-")[1].length === 4 && (
        <div style={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
          <EuiButton href={"tel:" + searchedDSN.number + phoneNum.split("-")[1]}>📞 {searchedDSN.number + phoneNum.split("-")[1]}</EuiButton>
        </div>
      )}
      {!!phoneNum && !!searchedDSN && <EuiCodeBlock language="json">{JSON.stringify(searchedDSN, null, 2)}</EuiCodeBlock>}
    </>
  );
};

export default SearchBar;
