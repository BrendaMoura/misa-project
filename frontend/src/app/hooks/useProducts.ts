import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product";

export function useProducts() {
  const {
    data = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return { products: data, isPending, isError };
}
