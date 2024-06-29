import { useLoaderData } from "react-router-dom";

import { User } from "../types";
import { cookies } from "../modules/auth";

type MyUserResponse = {
  message: string;
  user: User;
};

export async function loader() {
  const token = cookies.get("token");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const myUserResponse: MyUserResponse = await response.json();

  return { myUserResponse };
}

export function MeRoute() {
  const { myUserResponse } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <>
      <h2>My User Account Details</h2>
      <pre>{JSON.stringify(myUserResponse, null, 2)}</pre>
    </>
  );
}
