import { useLoaderData } from "react-router-dom";

import { Product } from "@/types";
import { Card } from "@/components/ui/card";

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

export function ProductsRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <h1>Products Route</h1>
      <ul className="grid grid-cols-4 gap-4">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Card>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
