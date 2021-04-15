import { EuiButton, EuiSpacer } from "@elastic/eui";
import { createUseStyles } from "react-jss";
import { theme } from "./theme";

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

interface PhoneLinkProps {
  commercial: string;
  lastFour: string;
}

const PhoneLink = (props: PhoneLinkProps) => {
  const classes = useStyles(theme);
  const { commercial, lastFour } = props;

  return (
    <>
      <EuiSpacer size="m" />
      <div className={classes.centerDiv}>
        <EuiButton href={`tel:${commercial}${lastFour}`}>📞 {`${commercial}${lastFour}`}</EuiButton>
      </div>
    </>
  );
};

export default PhoneLink;
