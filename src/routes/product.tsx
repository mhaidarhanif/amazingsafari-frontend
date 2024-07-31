import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";

import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { BACKEND_API_URL } from "@/libs/env";
import { authProvider } from "@/libs/auth";
import { convertToIDR } from "@/libs/currency";
import { Input } from "@/components/ui/input";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  try {
    const response = await fetch(`${BACKEND_API_URL}/products/${slug}`);
    const product: Product = await response.json();
    return { slug, product };
  } catch (error) {
    return { slug, product: null };
  }
}

export function ProductSlugRoute() {
  const { slug, product } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  if (!product) {
    return <p>Product "{slug}" not found.</p>;
  }

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-2xl flex gap-6 pt-10">
        <img
          src={product.imageURL}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg w-full max-w-xs object-contain bg-stone-200"
        />

        <div className="space-y-6">
          <h4 className="text-3xl font-bold">{product.name}</h4>
          <h5 className="text-2xl font-medium">
            {convertToIDR(product.price)}
          </h5>

          <p>{product.description}</p>

          <Form method="post" className="flex gap-2">
            <input type="hidden" name="productId" defaultValue={product.id} />
            <Input
              type="number"
              name="quantity"
              defaultValue={1}
              className="w-20"
            />
            <Button type="submit">Add to Cart</Button>
          </Form>
        </div>
      </div>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const token = authProvider.getToken();
  if (!token) return null;

  const formData = await request.formData();

  const addToCartData = {
    productId: formData.get("productId")?.toString(),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(`${BACKEND_API_URL}/cart/items`, {
    method: "POST",
    body: JSON.stringify(addToCartData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCartResponse: any = await response.json();

  if (!addToCartResponse) {
    return null;
  }

  return null;
}
