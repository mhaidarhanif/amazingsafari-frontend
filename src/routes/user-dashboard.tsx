import { Form, redirect, useLoaderData } from "react-router-dom";

import { auth } from "@/libs/auth";
import { Button } from "@/components/ui/button";

export async function loader() {
  const user = await auth.checkUser();
  if (!user) return redirect("/login");
  return { user };
}

export function UserDashboardRoute() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  if (data instanceof Response) return null;

  return (
    <main className="flex justify-center pt-10">
      <div className="space-y-6 w-full max-w-xs">
        <h1 className="text-2xl font-medium">Welcome, {data.user.username}</h1>

        <p>📧 {data.user.email}</p>

        <Form method="post">
          <Button type="submit">Logout</Button>
        </Form>
      </div>
    </main>
  );
}

export async function action() {
  auth.logout();
  return redirect("/login");
}
