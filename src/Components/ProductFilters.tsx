
interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  maxPrice: string;
  setMaxPrice: (value: string) => void;

  categories: string[];

  clearFilters: () => void;
}

function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  categories,
  clearFilters,
}: ProductFiltersProps) {

  return (
    <div className="w-full p-6">

      <div className="mb-6">

        <h2 className="text-lg font-bold text-gray-900">
          Filters
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Refine your product search
        </p>

      </div>

      <div className="flex flex-col gap-6">

        <div>

          <label
            htmlFor="product-search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search Products
          </label>

          <input
            id="product-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

        </div>

        <div>

          <label
            htmlFor="product-category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>

          <select
            id="product-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >

            <option value="all">
              All Categories
            </option>

            {categories.map((item) => (

              <option key={item} value={item}>
                {item}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label
            htmlFor="maximum-price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Maximum Price ($)
          </label>

          <input
            id="maximum-price"
            type="number"
            placeholder="Enter maximum price"
            min="0"
            step="0.01"
            value={maxPrice}
            onChange={(e) => {

              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setMaxPrice(value);
              }

            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

        </div>

      </div>

      <button
        type="button"
        onClick={clearFilters}
        className="w-full mt-8 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors cursor-pointer"
      >
        Clear Filters
      </button>

    </div>
  );
}

export default ProductFilters;
