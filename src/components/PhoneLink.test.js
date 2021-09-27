import { render, screen } from "@testing-library/react";

import PhoneLink from "./PhoneLink";

test("phone link activates with correct input", () => {
  const PhoneProps = {
    commercial: "+49 6371 47",
    lastFour: "8097",
    isDisabled: false,
  };
  render(<PhoneLink {...PhoneProps} />);
  expect(screen.getByRole("link")).toHaveAttribute("href", "tel:+49 6371 478097");
  expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "false");
});

test("phone link deactivates with incorrect input", () => {
  const PhoneProps2 = {
    commercial: "",
    lastFour: "",
    isDisabled: true,
  };
  render(<PhoneLink {...PhoneProps2} />);
  expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
});
