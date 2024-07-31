import { Link } from "react-router-dom";

import { CartItem } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { convertToIDR } from "@/libs/currency";
import { Button } from "../ui/button";

export function CartItemsList({ cartItems }: { cartItems: CartItem[] }) {
  return (
    <div>
      {cartItems.length <= 0 && (
        <div className="space-y-2">
          <p>Your cart is empty</p>
          <Button asChild>
            <Link to="/products">Add some products</Link>
          </Button>
        </div>
      )}

      <ul className="space-y-6">
        {cartItems.map((cartItem) => (
          <li key={cartItem.id}>
            <div className="flex gap-4">
              <Link to={`/products/${cartItem.product.slug}`}>
                <img
                  src={cartItem.product.imageURL}
                  alt={cartItem.product.name}
                  width={200}
                  height={200}
                  className="rounded-lg size-32 object-contain bg-stone-200"
                />
              </Link>

              <div className="space-y-1">
                <Link to={`/products/${cartItem.product.slug}`}>
                  <h4 className="text-xl font-medium">
                    {cartItem.product.name}
                  </h4>
                </Link>

                {/* Subtotal */}
                <p className="text-lg">
                  {convertToIDR(cartItem.product.price * cartItem.quantity)}
                </p>

                <p className="text-stone-400">
                  <span>{cartItem.quantity}</span>
                  <span> × </span>
                  <span>{convertToIDR(cartItem.product.price)}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
