
import type { CartItem } from "../store/cartStore";

import { calculateCartTotals } from "../utils/cartCalculations";

interface CartSummaryProps {
  items: CartItem[];
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
}

function CartSummary({
  items,
  showCheckoutButton = true,
  onCheckout,
}: CartSummaryProps) {

  const {
    subtotal,
    tax,
    discount,
    finalTotal,
    canCheckout,
  } = calculateCartTotals(items);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">

      <h2 className="text-xl font-bold mb-5">
        Order Summary
      </h2>

      <div className="flex justify-between mb-3">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-3">
        <span>Tax (5%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-3 text-green-600">
        <span>Discount</span>
        <span>-${discount.toFixed(2)}</span>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between font-bold text-xl">
        <span>Final Total</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>

      {showCheckoutButton && (
        <div className="mt-6">

          <button
            type="button"
            disabled={!canCheckout || !onCheckout}
            onClick={onCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            Proceed to Checkout
          </button>

          {!canCheckout && (
            <p className="text-red-600 text-sm mt-3 text-center">
              Minimum cart value of $10 is required to checkout.
            </p>
          )}

        </div>
      )}

    </div>
  );
}

export default CartSummary;
