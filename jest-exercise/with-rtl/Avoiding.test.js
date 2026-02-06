/** @jest-environment jsdom */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("survive refactoring", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  const button = screen.getByRole("button", { name: /count: 0/i });
  expect(button).toBeInTheDocument();

  await user.click(button);
  // expect(button).toHaveTextContent("Count: 1");
  expect(screen.getByRole("button", { name: /count: 1/i })).toBeInTheDocument();
});
