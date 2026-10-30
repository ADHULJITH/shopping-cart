
import { useEffect } from "react";

import { useCartStore } from "../store/cartStore";
import { calculateCartTotals } from "../utils/cartCalculations";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}: CartDrawerProps) {

  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const { canCheckout } = calculateCartTotals(items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {

    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">

      <button
        type="button"
        onClick={onClose}
        aria-label="Close shopping cart"
        className="absolute inset-0 w-full h-full bg-black/50 cursor-pointer"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 h-full w-full sm:w-125 max-w-full bg-gray-50 shadow-xl flex flex-col"
      >

        <div className="bg-white p-5 border-b border-gray-200 flex items-center justify-between">

          <h2 className="text-xl font-bold">
            Your Cart ({cartCount})
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-gray-600 hover:text-black text-2xl cursor-pointer"
          >
            ×
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {items.length === 0 ? (

            <div className="text-center py-16 text-gray-500">
              Your cart is empty.
            </div>

          ) : (

            <>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Clear Cart
              </button>
            </>

          )}

        </div>

        {items.length > 0 && (

          <div className="border-t border-gray-200 bg-white p-5">

            <CartSummary
              items={items}
              showCheckoutButton={false}
            />

            <button
              type="button"
              disabled={!canCheckout}
              onClick={onCheckout}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              Proceed to Checkout
            </button>

            {!canCheckout && (
              <p className="text-red-600 text-sm text-center mt-2">
                Minimum cart subtotal of $10 is required.
              </p>
            )}

          </div>

        )}

      </aside>

    </div>
  );
}

export default CartDrawer;
