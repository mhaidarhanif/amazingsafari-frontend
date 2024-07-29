import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { User } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type RegisterResponse = {
  message: string;
  newUser: Pick<User, "username">;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const userData = {
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    }
  );
  const registerResponse: RegisterResponse = await response.json();

  if (!registerResponse) {
    return null;
  }

  return redirect("/login");
};

export function RegisterRoute() {
  return (
    <main className="flex justify-center">
      <div className="space-y-10">
        <h1>Register</h1>

        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" name="username" required />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" name="email" required />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" name="password" required />
          </div>

          <Button type="submit">Register New User</Button>
        </Form>
      </div>
    </main>
  );
}
