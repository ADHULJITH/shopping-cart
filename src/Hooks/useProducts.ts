
import { useQuery } from "@tanstack/react-query";

import {
  productsResponseSchema,
} from "../Schemas/productSchema";

const fetchProducts = async () => {

  const response = await fetch(
    "https://dummyjson.com/products?limit=30"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: unknown = await response.json();

  return productsResponseSchema.parse(data);
};

export const useProducts = () => {

  return useQuery({
    queryKey: ["products"],

    queryFn: fetchProducts,

    staleTime: 1000 * 60 * 5,
  });

};
