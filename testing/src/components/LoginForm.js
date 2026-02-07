import { useForm } from "react-hook-form";

const emailRegex =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:\d{1,3}\.){3}\d{1,3}\]))$/;

function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: "onSubmit" });

  const onValidSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      onSubmit(result);
    } catch (error) {
      setError("root", { message: errors.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: "Email is Required",
            pattern: {
              value: emailRegex,
              message: "Email is Invalid",
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          {...register("password", {
            required: "Password is Required",
          })}
        />
      </div>
      {errors.email && <div role="alert">{errors.email.message}</div>}
      {!errors.email && errors.password && (
        <div role="alert">{errors.password.message}</div>
      )}
      {errors.root && <div role="alert">{errors.root.message}</div>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
