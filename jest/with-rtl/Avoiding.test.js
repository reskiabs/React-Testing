/** @jest-environment jsdom */

import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Counter from "./Counter";

test("will fail when classname changes", () => {
  const { container } = render(<Counter />);
  const button = container.querySelector(".btn-counter");

  expect(button).toHaveTextContent("Count: 0");
  fireEvent.click(button);
  expect(button).toHaveTextContent("Count: 1");
});
