import { Link } from "react-router-dom";

import { Product } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { convertToIDR } from "@/libs/currency";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
                  className="rounded-lg w-full object-contain bg-stone-200"
                />
              </CardHeader>

              <CardContent className="py-2">
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
