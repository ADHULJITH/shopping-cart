
import { useCartStore } from "../store/cartStore";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

interface CartProps {
  onCheckout?: () => void;
}

function Cart({ onCheckout }: CartProps) {

  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="mt-12">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Shopping Cart ({cartCount})
        </h2>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-red-600 hover:underline cursor-pointer"
          >
            Clear Cart
          </button>
        )}

      </div>

      {items.length === 0 ? (

        <div className="bg-white p-10 rounded-lg text-center text-gray-500">
          Your cart is empty.
        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-4">

            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}

          </div>

          <div>
            <CartSummary
              items={items}
              onCheckout={onCheckout}
            />
          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;
