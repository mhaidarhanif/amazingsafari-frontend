import { useLoaderData } from "react-router-dom";

import { Product } from "@/types";
import { ProductsGrid } from "@/components/shared/products-grid";
import { BACKEND_API_URL } from "@/libs/env";

export async function loader() {
  try {
    const response = await fetch(`${BACKEND_API_URL}/products`);
    const products: Product[] = await response.json();
    return { products };
  } catch (error) {
    return { products: [] };
  }
}

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <main className="flex justify-center">
      <div className="p-6 max-w-7xl">
        <ProductsGrid products={products} />
      </div>
    </main>
  );
}
