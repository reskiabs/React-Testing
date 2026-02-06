import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm";

describe("Login Form Component", () => {
  test("render login form with email and password fields", () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
