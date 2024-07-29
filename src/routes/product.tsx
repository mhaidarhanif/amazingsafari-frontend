import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";

import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { authCookie } from "@/modules/auth";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/products/${slug}`
    );
    const product: Product = await response.json();
    return { product };
  } catch (error) {
    return { product: null };
  }
}

export function ProductSlugRoute() {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(product, null, 2)}</pre>

      <Form method="post">
        <input type="hidden" name="productId" defaultValue={product.id} />
        <input type="number" name="quantity" defaultValue={1} />

        <Button type="submit">Add to Cart</Button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const token = authCookie.get("token");
  const formData = await request.formData();

  const addToCartData = {
    productId: formData.get("productId")?.toString(),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/cart/items`,
    {
      method: "POST",
      body: JSON.stringify(addToCartData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCartResponse: any = await response.json();

  if (!addToCartResponse) {
    return null;
  }

  return null;
}
