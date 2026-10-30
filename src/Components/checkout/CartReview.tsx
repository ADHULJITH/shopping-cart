
import { useCartStore } from "../../store/cartStore";

import { calculateCartTotals } from "../../utils/cartCalculations";

import CartItem from "../CartItem";
import CartSummary from "../CartSummary";

interface CartReviewProps {
  onContinue: () => void;
  onBack: () => void;
}

function CartReview({
  onContinue,
  onBack,
}: CartReviewProps) {

  const items = useCartStore((state) => state.items);

  const { canCheckout } = calculateCartTotals(items);

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Review Your Cart
      </h2>

      {items.length === 0 ? (

        <p className="bg-white p-6 rounded-lg">
          Your cart is empty.
        </p>

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

        
          <CartSummary
            items={items}
            showCheckoutButton={false}
          />

        </div>

      )}

      {!canCheckout && (
        <p className="text-red-600 mt-5">
          A minimum cart subtotal of $10 is required
          to continue.
        </p>
      )}

      <div className="flex justify-between gap-4 mt-8">

        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 px-6 py-3 rounded cursor-pointer"
        >
          Back to Shopping
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!canCheckout}
          className="bg-blue-600 text-white px-6 py-3 rounded disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          Continue to Shipping
        </button>

      </div>

    </div>
  );
}

export default CartReview;
