/** @jest-environment jsdom */

import { act } from "react";
import { createRoot } from "react-dom/client";
import Counter from "./Counter";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("should render and update the count when on click", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(<Counter />);
  });

  const button = container.querySelector("button");
  expect(button.textContent).toBe("Count: 0");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(button.textContent).toBe("Count: 1");

  act(() => {
    root.unmount();
  });

  container.remove();
});

test("should also work correctly in a second", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const buttonBody = document.body;
  console.log(buttonBody.innerHTML);

  const root = createRoot(container);
  act(() => {
    root.render(<Counter />);
  });

  const button = container.querySelector("button");
  expect(button.textContent).toBe("Count: 0");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(button.textContent).toBe("Count: 1");

  act(() => {
    root.unmount();
  });

  container.remove();
});
