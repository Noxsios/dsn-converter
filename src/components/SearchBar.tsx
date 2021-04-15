import { EuiFieldSearch } from "@elastic/eui";
import { useState, ChangeEvent, useEffect } from "react";
import dsn_index from "../meta/dsn_index.json";
import _ from "lodash";
import InputMask from "react-input-mask";
import { createUseStyles } from "react-jss";
import { theme } from "./theme";
import PhoneLink from "./PhoneLink";

const useStyles = createUseStyles({
  searchBar: {
    fontSize: "120%",
    fontFamily: "monospace",
  },
  centerDiv: {
    display: "flex",
    justifyContent: "center",
  },
});

const dsnRegex = new RegExp(/^([0-9]{3})-([0-9]{4})$/);
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
  const classes = useStyles(theme);
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
      <div className={classes.centerDiv}>
        <InputMask value={phoneNum} mask={"999-9999"} maskPlaceholder={null} onChange={handleChange}>
          <EuiFieldSearch type="tel" prepend="DSN" className={classes.searchBar} />
        </InputMask>
      </div>
      {phoneNum.match(dsnRegex) && !!searchedDSN && <PhoneLink commercial={searchedDSN.number} lastFour={phoneNum.split("-")[1]} />}
    </>
  );
};

export default SearchBar;
