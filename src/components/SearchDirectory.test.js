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

test("table pagination works correctly", () => {
  const { container } = render(<SearchDirectory />);
  const accordionButton = container.querySelector(".euiAccordion__button");
  userEvent.click(accordionButton);
  const page1 = container.querySelector("[aria-label='Page 1 of 16']");
  expect(page1.classList.contains("euiPaginationButton-isActive")).toEqual(true);
  const page2 = container.querySelector("[aria-label='Page 2 of 16']");
  userEvent.click(page2);
  expect(container.querySelector("[aria-label='Page 1 of 16']").classList.contains("euiPaginationButton-isActive")).toEqual(false);
  expect(container.querySelector("[aria-label='Page 2 of 16']").classList.contains("euiPaginationButton-isActive")).toEqual(true);
});

test("table changes number of rows per page", () => {
  const { container } = render(<SearchDirectory />);
  const accordionButton = container.querySelector(".euiAccordion__button");
  userEvent.click(accordionButton);
  const rowsPerPageDropdown = container.querySelector("[data-test-subj='tablePaginationPopoverButton']");
  userEvent.click(rowsPerPageDropdown);
  const show25Rows = document.querySelector("[data-test-subj='tablePagination-25-rows']");
  userEvent.click(show25Rows);
  expect(container.querySelectorAll(".euiTableRow").length).toBe(25);
  const show50Rows = document.querySelector("[data-test-subj='tablePagination-50-rows']");
  userEvent.click(show50Rows);
  expect(container.querySelectorAll(".euiTableRow").length).toBe(50);
  const show5Rows = document.querySelector("[data-test-subj='tablePagination-5-rows']");
  userEvent.click(show5Rows);
  expect(container.querySelectorAll(".euiTableRow").length).toBe(5);
});

test("table errors correctly", async () => {
  const { container } = render(<SearchDirectory />);
  const accordionButton = container.querySelector(".euiAccordion__button");
  userEvent.click(accordionButton);
  const searchBar = container.querySelector("input");
  userEvent.type(searchBar, "^");
  const errorMessage = container.querySelector(".euiCallOutHeader__title").textContent;
  expect(errorMessage).toBe('Invalid search: Expected "(", "-", "is:", end of input, field, term, or whitespace but "^" found.');
});
