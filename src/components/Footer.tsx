import { EuiFlexGroup, EuiFlexItem, EuiText, EuiHorizontalRule } from "@elastic/eui";
import FooterLink from "./FooterLink";
import { createUseStyles } from "react-jss";
import { theme } from "./theme";

const useStyles = createUseStyles({
  container: {
    bottom: 0,
    position: "relative",
    userSelect: "none",
  },
});

const Footer = () => {
  const classes = useStyles(theme);
  return (
    <div className={classes.container}>
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem>
          <EuiText size="s" color="warning" textAlign="center">
            SrA Harry Randazzo - aka Razzle-Dazzle ✨
            <EuiHorizontalRule size="half" margin="xs" />
            <FooterLink name="Github" href="https://github.com/Noxsios/dsn-converter" />
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default Footer;
