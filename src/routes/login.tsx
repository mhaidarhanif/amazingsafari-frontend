import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { cookies } from "../modules/auth";

type LoginResponse = {
  message: string;
  token: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const userData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const loginResponse: LoginResponse = await response.json();

  if (!loginResponse) {
    return null;
  }

  const token = loginResponse.token;

  cookies.set("token", token);

  return redirect("/me");
};

export function LoginRoute() {
  return (
    <main>
      <h1>Login</h1>

      <Form method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </Form>
    </main>
  );
}
