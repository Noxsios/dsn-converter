import { render, waitFor, cleanup } from "@testing-library/react";

import SearchDirectory from "./SearchDirectory";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

test("search bar recieves and saves input", async () => {
  const { container } = render(<SearchDirectory />);
  const accordionButton = container.querySelector(".euiAccordion__button");

  userEvent.click(accordionButton);
  const searchBar = container.querySelector("input");

  userEvent.type(searchBar, "Ramstein");
  expect(searchBar.value).toBe("Ramstein");

  const results = await waitFor(() => container.querySelectorAll(".euiTableRow"));
  expect(results.length).toBe(3);
});

test("should expand and unexpand accordion", () => {
  const { container } = render(<SearchDirectory />);
  const accordionButton = container.querySelector(".euiAccordion__button");
  userEvent.click(accordionButton);
  expect(accordionButton).toHaveAttribute("aria-expanded", "true");
  userEvent.click(accordionButton);
  expect(accordionButton).toHaveAttribute("aria-expanded", "false");
});
