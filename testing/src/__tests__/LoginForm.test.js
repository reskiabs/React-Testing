import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import LoginForm from "../components/LoginForm";
import { server } from "../mocks/server";

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

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        user: { name: "Reski" },
      });
    });
  });

  test("show error when credential are wrong", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "passwordsss");
    await user.click(submitButton);

    waitFor(async () => {
      const errorMessage = await screen.queryByRole("alert");
      expect(errorMessage).toHaveTextContent(/invalid credentials/i);
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
    const errorMessage = await screen.queryByRole("alert");
    expect(errorMessage).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /login/i }));

    // findBy* → dipakai untuk element yang muncul secara asynchronous
    // akan menunggu sampai element muncul atau timeout
    const errorAfter = await screen.findByRole("alert");
    expect(errorAfter).toBeInTheDocument();
  });

  test("show error when server fail", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    server.use(
      http.post("/api/login", () => {
        HttpResponse.json(
          {
            message: "Server Error",
          },
          { status: 500 },
        );
      }),
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    waitFor(async () => {
      const errorMessage = await screen.queryByRole("alert");
      expect(errorMessage).toHaveTextContent(/invalid credentials/i);
    });
  });
});
