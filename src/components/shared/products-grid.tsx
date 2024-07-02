import { Link } from "react-router-dom";

import { Product } from "@/types";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
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
  );
}
