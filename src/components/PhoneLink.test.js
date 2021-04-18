import { render, screen } from "@testing-library/react";

import PhoneLink from "./PhoneLink";

test("phone link activates/deactivates with correct input", () => {
  const PhoneProps = {
    commercial: "+49 6371 47",
    lastFour: "8097",
    isDisabled: false,
  };
  render(<PhoneLink {...PhoneProps} />);
  expect(screen.getByRole("link")).toHaveAttribute("href", "tel:+49 6371 478097");
});
