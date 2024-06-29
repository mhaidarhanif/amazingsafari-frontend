import { Link, useLoaderData } from "react-router-dom";

import { Product } from "../types";

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
  const products: Product[] = await response.json();

  return { products };
}

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.slug}`}>
              <div>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  width={200}
                  height={200}
                />
                <h4>{product.name}</h4>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
