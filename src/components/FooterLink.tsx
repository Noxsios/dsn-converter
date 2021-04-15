import { EuiLink, EuiLinkColor } from "@elastic/eui";

interface FooterLinkProps {
  name: string;
  href: string;
  color?: EuiLinkColor;
}

const FooterLink = ({ name, href, color = "primary" }: FooterLinkProps) => {
  return (
    <EuiLink href={href} target="_blank" color={color} external>
      {name}
    </EuiLink>
  );
};

export default FooterLink;
