import { ActionFunctionArgs, Form, redirect } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authProvider } from "@/libs/auth";

export function LoginRoute() {
  return (
    <main className="flex justify-center pt-10">
      <div className="space-y-6 w-full max-w-xs">
        <h1 className="text-xl font-medium">Login to your account</h1>

        <Form method="post" className="space-y-2">
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" name="username" required />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" name="password" required />
          </div>

          <Button type="submit" className="w-full">
            Login User
          </Button>
        </Form>
      </div>
    </main>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const userLogin = {
    username: String(formData.get("username")),
    password: String(formData.get("password")),
  };

  const result = authProvider.login(userLogin);
  if (!result) return null;

  return redirect("/");
};
