import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

test("renders footer", () => {
  render(<Footer />);
  const footerElement = screen.getByText(/SrA Harry Randazzo - aka Razzle-Dazzle ✨/i);
  expect(footerElement).toBeInTheDocument();
});
