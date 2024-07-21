import { useLoaderData } from "react-router-dom";

import { Product } from "../types";
import { ProductsGrid } from "@/components/shared/products-grid";

export async function loader() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/products`
    );
    const products: Product[] = await response.json();
    return { products };
  } catch (error) {
    return { products: [] };
  }
}

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div className="p-10">
      <ProductsGrid products={products} />
    </div>
  );
}
