
import type { Product } from "../Schemas/productSchema";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {

  const addItem = useCartStore((state) => state.addItem);

  const quantityInCart = useCartStore(
    (state) =>
      state.items.find((item) => item.id === product.id)?.quantity ?? 0
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-contain mb-4"
      />

      <h2 className="text-lg font-semibold">
        {product.title}
      </h2>

      <p className="text-gray-500 text-sm">
        {product.category}
      </p>

      <p className="text-blue-600 font-bold mt-2">
        ${product.price.toFixed(2)}
      </p>

      <p className="text-yellow-600 mt-1">
        Rating: {product.rating}
      </p>

      <button
        type="button"
        onClick={() => addItem(product)}
        disabled={quantityInCart >= 5}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {quantityInCart >= 5
          ? "Maximum Quantity Reached"
          : "Add to Cart"}
      </button>

    </div>
  );
}

export default ProductCard;
