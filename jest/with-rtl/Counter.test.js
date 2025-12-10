/** @jest-environment jsdom */

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("should render and update the count when on click", () => {
  render(<Counter />);

  const button = screen.getByRole("button");
  console.log(button);
  // expect(button.textContent).toBe("Count: 0");

  // act(() => {
  //   button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // });
  // expect(button.textContent).toBe("Count: 1");

  // act(() => {
  //   root.unmount();
  // });

  // container.remove();
});
