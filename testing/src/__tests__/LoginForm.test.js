import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../components/LoginForm";

describe("Login Form Component", () => {
  test("render login form with email and password fields", () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error when email is empty and form is submitted", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    await user.click(submitButton);

    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test("show error for invalid email format", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is invalid/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test("submit the form with correct email and password", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // screen.debug();

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  test("submit the form with varied data using faker", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    await user.type(emailInput, randomEmail);
    await user.type(passwordInput, randomPassword);
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: randomEmail,
      password: randomPassword,
    });
  });

  test("demo getBy, queryBy, and findBy queries", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    // getBy* → dipakai jika element WAJIB ada
    // akan throw error jika element tidak ditemukan
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    // queryBy* → dipakai jika element MUNGKIN tidak ada
    // return null jika tidak ditemukan (TIDAK throw error)
    const errorMessage = screen.queryByRole("alert");
    expect(errorMessage).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /login/i }));

    // findBy* → dipakai untuk element yang muncul secara asynchronous
    // akan menunggu sampai element muncul atau timeout
    const errorAfter = await screen.findByRole("alert");
    expect(errorAfter).toBeInTheDocument();
  });
});
