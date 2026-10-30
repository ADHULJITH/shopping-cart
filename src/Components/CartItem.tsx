
import type { CartItem as CartItemType } from "../store/cartStore";
import { useCartStore } from "../store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">

      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-24 h-24 object-contain"
      />

      <div className="flex-1">

        <h3 className="font-semibold text-lg">
          {item.title}
        </h3>

        <p className="text-gray-500">
          ${item.price.toFixed(2)} each
        </p>

        <div className="flex items-center gap-3 mt-3">

          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={item.quantity <= 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            -
          </button>

          <span className="font-semibold">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={item.quantity >= 5}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            +
          </button>

        </div>

        <p className="font-bold mt-3">
          Total: ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="text-red-600 mt-3 hover:underline cursor-pointer"
        >
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;
