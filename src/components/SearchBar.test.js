import { render, screen } from "@testing-library/react";

import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

test("search bar receives and saves input", () => {
  render(<SearchBar />);
  const inputElement = screen.getByDisplayValue("");
  userEvent.type(inputElement, "4808097");
  expect(inputElement).toHaveValue("480-8097");
});
