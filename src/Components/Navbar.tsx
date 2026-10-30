
import { useCartStore } from "../store/cartStore";

interface NavbarProps {
  onCartClick: () => void;
  onHomeClick: () => void;
}

function Navbar({
  onCartClick,
  onHomeClick,
}: NavbarProps) {

  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">

      <div className="w-full px-6 lg:px-8 h-[72px] flex items-center justify-between">

        <button
          type="button"
          onClick={onHomeClick}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          ShopCart
        </button>

        <div className="flex items-center gap-6">

          <button
            type="button"
            onClick={onHomeClick}
            className="hidden sm:block text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            Products
          </button>

          <button
            type="button"
            onClick={onCartClick}
            aria-label={`Open shopping cart, ${cartCount} items`}
            className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
