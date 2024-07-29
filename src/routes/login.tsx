import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { authCookie } from "../modules/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginResponse = {
  message: string;
  token: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const userData = {
    username: formData.get("username")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    }
  );
  const loginResponse: LoginResponse = await response.json();

  if (!loginResponse) {
    return null;
  }

  const token = loginResponse.token;

  authCookie.set("token", token);

  return redirect("/");
};

export function LoginRoute() {
  return (
    <main className="flex justify-center">
      <div className="space-y-10">
        <h1>Login</h1>

        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" name="username" required />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" name="password" required />
          </div>

          <Button type="submit">Login User</Button>
        </Form>
      </div>
    </main>
  );
}
