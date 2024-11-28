import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/order";

export function useOrders() {
  const {
    data = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  return { orders: data, isPending, isError };
}
