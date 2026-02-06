/** @jest-environment jsdom */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("should render and update the count when on click", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole("button");

  expect(button).toHaveTextContent("Count: 0");

  await user.click(button);

  console.log("After click", button.outerHTML);
  expect(button).toHaveTextContent("Count: 1");
});

test("should start with a clean DOM in the next step", () => {
  const buttonBefore = document.body.querySelectorAll("button");
  console.log("button before render in second test: ", buttonBefore.length);

  expect(buttonBefore.length).toBe(0);

  render(<Counter />);

  const buttonAfter = screen.getByRole("button");
  expect(buttonAfter).toBeInTheDocument();
  expect(buttonAfter).toHaveTextContent("Count: 0");
});
