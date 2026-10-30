
import { useMemo, useState } from "react";

import type { Product } from "../Schemas/productSchema";

export function useProductFilters(products: Product[]) {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [maxPrice, setMaxPrice] = useState("");

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesPrice =
        maxPrice === "" ||
        product.price <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesPrice;

    });

  }, [products, search, category, maxPrice]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMaxPrice("");
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    clearFilters,
  };
}
