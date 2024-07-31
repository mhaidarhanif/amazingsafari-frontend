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

export function ProductsRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <main className="flex justify-center">
      <div className="p-6">
        <section className="space-y-6">
          <h1 className="font-bold text-2xl">Shop All Products</h1>

          <div className="flex justify-center max-w-5xl">
            <ProductsGrid products={products} />
          </div>
        </section>
      </div>
    </main>
  );
}
