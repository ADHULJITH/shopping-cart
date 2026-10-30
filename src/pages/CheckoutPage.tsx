
import { useState } from "react";

import { useCartStore } from "../store/cartStore";

import { calculateCartTotals } from "../utils/cartCalculations";

import {
  shippingSchema,
  type ShippingDetails,
} from "../Schemas/shippingSchema";

import CartReview from "../Components/checkout/CartReview";

import ShippingForm from "../Components/checkout/ShippingForm";

import PaymentSummary from "../Components/checkout/PaymentSummary";

interface CheckoutPageProps {
  onBackToShopping: () => void;
}

function CheckoutPage({
  onBackToShopping,
}: CheckoutPageProps) {

  const [step, setStep] = useState(1);

  const [shippingDetails, setShippingDetails] =
    useState<ShippingDetails>({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const { canCheckout } = calculateCartTotals(items);

  const handleCartContinue = () => {

    if (!canCheckout) {
      return;
    }

    setStep(2);
  };

  const handleShippingContinue = (
    details: ShippingDetails
  ) => {

    const result = shippingSchema.safeParse(details);

    if (!result.success) {
      return;
    }

    setShippingDetails(result.data);

    setStep(3);
  };

  const handlePlaceOrder = () => {

    if (!canCheckout) {
      return;
    }

    const result = shippingSchema.safeParse(
      shippingDetails
    );

    if (!result.success) {
      return;
    }

    setOrderPlaced(true);

    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto bg-white p-10 rounded-lg shadow-sm text-center">

        <div className="text-5xl mb-5">
          ✓
        </div>

        <h2 className="text-2xl font-bold text-green-600">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-600 mt-4">
          Thank you for your order.
          Your shopping cart has been cleared.
        </p>

        <button
          type="button"
          onClick={onBackToShopping}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 cursor-pointer"
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  if (!canCheckout) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg text-center">

        <h2 className="text-xl font-bold mb-3">
          Checkout Unavailable
        </h2>

        <p className="text-red-600 mb-6">
          Your cart must have a minimum subtotal of $10.
        </p>

        <button
          type="button"
          onClick={onBackToShopping}
          className="bg-blue-600 text-white px-6 py-3 rounded cursor-pointer"
        >
          Return to Shopping
        </button>

      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Checkout
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-8">

        {["Cart Review", "Shipping", "Payment Summary"].map(
          (label, index) => (

            <div
              key={label}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                step === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}. {label}
            </div>

          )
        )}

      </div>

      {step === 1 && (
        <CartReview
          onContinue={handleCartContinue}
          onBack={onBackToShopping}
        />
      )}

      {step === 2 && (
        <ShippingForm
          initialValues={shippingDetails}
          onContinue={handleShippingContinue}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <PaymentSummary
          items={items}
          shippingDetails={shippingDetails}
          onBack={() => setStep(2)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

    </div>
  );
}

export default CheckoutPage;
