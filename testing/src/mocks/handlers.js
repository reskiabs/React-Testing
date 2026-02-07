import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { email, password } = await request.json();

    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json({
        user: { name: "Reski" },
      });
    }

    return HttpResponse.json(
      { message: "Invalid Credentials" },
      { status: 401 },
    );
  }),
];
