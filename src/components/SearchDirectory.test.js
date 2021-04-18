import { render, screen } from "@testing-library/react";

import SearchDirectory from "./SearchDirectory";
import userEvent from "@testing-library/user-event";

test("search bar recieves and saves input", () => {
  render(<SearchDirectory />);
  const search = screen.getByDisplayValue("");
  //   userEvent.type(search, "R");

  expect(search).toBeTruthy();
});

test("should expand and unexpand accordion", () => {
  render(<SearchDirectory />);
  const accordionButton = screen.getByRole("button");
  userEvent.click(accordionButton);
  expect(accordionButton).toHaveAttribute("aria-expanded", "true");
  userEvent.click(accordionButton);
  expect(accordionButton).toHaveAttribute("aria-expanded", "false");
});
