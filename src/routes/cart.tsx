import { redirect, useLoaderData } from "react-router-dom";

import { Cart } from "@/types";
import { BACKEND_API_URL } from "@/libs/env";
import { authProvider } from "@/libs/auth";
import { CartItemsList } from "@/components/shared/cart-items-list";

export async function loader() {
  await authProvider.checkUser();
  if (!authProvider.isAuthenticated) return redirect("/login");

  const response = await fetch(`${BACKEND_API_URL}/cart`, {
    headers: { Authorization: `Bearer ${authProvider.getToken()}` },
  });

  const cart: Cart = await response.json();

  return { cart };
}

export function CartRoute() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  if (data instanceof Response) return null;

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-2xl pt-10 space-y-6">
        <h1 className="font-bold text-2xl">Shopping Cart</h1>

        <CartItemsList cartItems={data.cart.items} />
      </div>
    </main>
  );
}
