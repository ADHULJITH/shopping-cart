
import { useState } from "react";

import { useProducts } from "./Hooks/useProducts";
import { useProductFilters } from "./Hooks/useProductFilters";

import Navbar from "./Components/Navbar";
import ProductFilters from "./Components/ProductFilters";
import ProductGrid from "./Components/ProductGrid";
import CartDrawer from "./Components/CartDrawer";

import CheckoutPage from "./pages/CheckoutPage";

function App() {

  const [currentPage, setCurrentPage] =
    useState<"shopping" | "checkout">("shopping");

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

  const {
    data,
    isPending,
    isError,
    error,
  } = useProducts();

  const products = data?.products ?? [];

  const {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    clearFilters,
  } = useProductFilters(products);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage("checkout");
    window.scrollTo(0, 0);
  };

  const handleHome = () => {
    setIsCartOpen(false);
    setCurrentPage("shopping");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={handleHome}
      />

      {currentPage === "checkout" ? (

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">

          <CheckoutPage
            onBackToShopping={handleHome}
          />

        </div>

      ) : (

        <div className="flex flex-1 items-stretch w-full">

          <aside
            className={`
              ${showFilters ? "block" : "hidden"}
              lg:block
              w-full
              lg:w-72
              xl:w-80
              shrink-0
              bg-white
              border-r
              border-gray-200
            `}
          >

            <div className="lg:sticky lg:top-[72px] lg:max-h-[calc(100vh-72px)] lg:overflow-y-auto">

              <ProductFilters
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                categories={categories}
                clearFilters={clearFilters}
              />

            </div>

          </aside>

          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-5">

            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

              <div>

                <h1 className="text-2xl font-bold text-gray-900">
                  Discover Products
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Explore our collection of products.
                </p>

              </div>

              {!isPending && !isError && (
                <p className="text-sm text-gray-500">
                  {filteredProducts.length} products
                </p>
              )}

            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              className="lg:hidden mb-5 bg-white border border-gray-200 px-5 py-3 rounded-lg cursor-pointer"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {showFilters && (

              <div className="lg:hidden bg-white rounded-lg border border-gray-200 mb-6">

                <ProductFilters
                  search={search}
                  setSearch={setSearch}
                  category={category}
                  setCategory={setCategory}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  categories={categories}
                  clearFilters={clearFilters}
                />

              </div>

            )}

            {isPending ? (

              <p className="text-center py-16 text-gray-500">
                Loading products...
              </p>

            ) : isError ? (

              <div className="bg-white p-8 rounded-lg text-red-600">
                Failed to load products: {error.message}
              </div>

            ) : (

              <ProductGrid products={filteredProducts} />

            )}

          </main>

        </div>

      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

    </div>
  );
}

export default App;
