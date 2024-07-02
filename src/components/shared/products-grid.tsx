import { Link } from "react-router-dom";

import { Product } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { convertToIDR } from "@/libs/currency";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-4 gap-4 max-w-5xl">
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.slug}`}>
            <Card>
              <CardHeader>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-t-lg w-full object-contain"
                />
              </CardHeader>

              <CardContent>
                <h4 className="text-lg font-bold">{product.name}</h4>
                <p>{convertToIDR(product.price)}</p>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
