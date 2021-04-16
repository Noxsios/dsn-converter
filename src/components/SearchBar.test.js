import { render, screen, prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

test("search bar recieves and saves input", () => {
  render(<SearchBar />);
  const inputElement = screen.getByDisplayValue("");
  userEvent.type(inputElement, "4808097");
  expect(inputElement).toHaveValue("480-8097");
});
