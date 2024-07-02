import { useLoaderData } from "react-router-dom";

import { Product } from "../types";
import { ProductsGrid } from "@/components/shared/products-grid";

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
  const products: Product[] = await response.json();
  return { products };
}

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <ProductsGrid products={products} />
    </>
  );
}
