/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiText } from "@elastic/eui";

import FooterLink from "./FooterLink";

const StyledFooter = styled.footer`
  bottom: 0;
  position: relative;
  user-select: none;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem>
          <EuiText size="s" color="warning" textAlign="center">
            SrA Harry Randazzo - Razzle ✨
            <EuiHorizontalRule size="half" margin="xs" />
            <FooterLink name="Github" href="https://github.com/Noxsios/dsn-converter" />
            <span> | </span>
            <FooterLink name="Portfolio" href="https://razzle.cloud" />
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </StyledFooter>
  );
};

export default Footer;
