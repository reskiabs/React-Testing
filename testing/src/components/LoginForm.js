function LoginForm() {
  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="text" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
