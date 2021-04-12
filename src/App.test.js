import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders footer", () => {
  render(<App />);
  const linkElement = screen.getByText(/SrA Harry Randazzo/i);
  expect(linkElement).toBeInTheDocument();
});
