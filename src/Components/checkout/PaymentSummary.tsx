
import type { CartItem } from "../../store/cartStore";

import type { ShippingDetails } from "../../Schemas/shippingSchema";

import CartSummary from "../CartSummary";

interface PaymentSummaryProps {
  items: CartItem[];
  shippingDetails: ShippingDetails;
  onBack: () => void;
  onPlaceOrder: () => void;
}

function PaymentSummary({
  items,
  shippingDetails,
  onBack,
  onPlaceOrder,
}: PaymentSummaryProps) {

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Payment Summary
      </h2>

      {/* Shipping Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm">

        <h3 className="text-xl font-semibold mb-4">
          Shipping Details
        </h3>

        <div className="space-y-2 text-gray-700">

          <p>
            <strong>Name:</strong> {shippingDetails.fullName}
          </p>

          <p>
            <strong>Email:</strong> {shippingDetails.email}
          </p>

          <p>
            <strong>Phone:</strong> {shippingDetails.phone}
          </p>

          <p>
            <strong>Address:</strong> {shippingDetails.address}
          </p>

          <p>
            <strong>City:</strong> {shippingDetails.city}
          </p>

          <p>
            <strong>Postal Code:</strong> {shippingDetails.postalCode}
          </p>

        </div>

      </div>

      {/* Order Items */}
      <div className="bg-white p-6 rounded-lg shadow-sm">

        <h3 className="text-xl font-semibold mb-4">
          Order Items
        </h3>

        {items.map((item) => (

          <div
            key={item.id}
            className="flex justify-between gap-4 border-b border-gray-200 py-3"
          >

            <div>
              <p className="font-medium">
                {item.title}
              </p>

              <p className="text-gray-500 text-sm">
                Quantity: {item.quantity}
              </p>
            </div>

            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

          </div>

        ))}

      </div>

      <CartSummary
        items={items}
        showCheckoutButton={false}
      />

      <div className="flex justify-between gap-4">

        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 px-6 py-3 rounded cursor-pointer"
        >
          Back to Shipping
        </button>

        <button
          type="button"
          onClick={onPlaceOrder}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 cursor-pointer"
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default PaymentSummary;
