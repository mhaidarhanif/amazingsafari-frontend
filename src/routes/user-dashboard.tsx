import { redirect, useLoaderData } from "react-router-dom";

import { authProvider } from "@/libs/auth";

export async function loader() {
  const user = await authProvider.checkUser();
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
      </div>
    </main>
  );
}
