import { ChangeEvent, useEffect, useState } from "react";

import { EuiFieldText } from "@elastic/eui";
import InputMask from "react-input-mask";
import PhoneLink from "./PhoneLink";
import { createUseStyles } from "react-jss";
import { debounce } from "lodash";
import dsn_index from "../meta/dsn_index.json";
import { theme } from "./theme";

const useStyles = createUseStyles({
  searchBar: {
    fontSize: "120%",
    fontFamily: "monospace",
  },
});

export interface DSNPhoneObj {
  prefix: number | string;
  number: string;
  location: string;
}

const searchDSN = (prefix: number | string): DSNPhoneObj => {
  if (typeof prefix === "number") {
    return dsn_index.filter((ele) => ele.prefix === prefix)[0];
  } else {
    return dsn_index.filter((ele) => ele.prefix === Number(prefix))[0];
  }
};

const debounceInput = debounce((string: string) => string, 500);

const blankDSN = {
  prefix: "",
  number: "",
  location: "",
};

const SearchBar = () => {
  const classes = useStyles(theme);
  const [dsnQuery, setDSNQuery] = useState<string>("");
  const [searchedDSN, setSearchedDSN] = useState<DSNPhoneObj>(blankDSN);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const dsnPrefix: string = e.target.value.slice(0, 3);

    if (!!searchDSN(dsnPrefix)) {
      setSearchedDSN(searchDSN(dsnPrefix));
    } else {
      setSearchedDSN(blankDSN);
    }

    setDSNQuery(e.target.value);
  };

  useEffect(() => {
    debounceInput(dsnQuery);
  }, [dsnQuery]);

  return (
    <InputMask value={dsnQuery} mask={"999-9999"} maskPlaceholder={null} onChange={handleChange}>
      <EuiFieldText
        type="tel"
        prepend="DSN"
        className={classes.searchBar}
        fullWidth
        append={
          <PhoneLink
            commercial={searchedDSN.number}
            lastFour={dsnQuery.split("-")[1]}
            isDisabled={!searchedDSN.number.length || dsnQuery.length < 8}
          />
        }
      />
    </InputMask>
  );
};

export default SearchBar;
