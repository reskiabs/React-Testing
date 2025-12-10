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

  console.log("button after click", button.outerHTML);
  expect(button).toHaveTextContent("Count: 1");
});
