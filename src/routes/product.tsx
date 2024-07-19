import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import { Product } from "@/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/products/${slug}`
    );
    const product: Product[] = await response.json();
    return { product };
  } catch (error) {
    return { product: {} };
  }
}

export function ProductSlugRoute() {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <div>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
}
