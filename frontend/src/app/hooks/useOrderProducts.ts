import { useQuery } from "@tanstack/react-query";
import { getOrderProducts } from "../services/order";

export const useOrderProducts = (id: string) => {
  const {
    data = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["orderProducts", id],
    queryFn: () => getOrderProducts(id),
  });
  return { orderProducts: data, isPending, isError };
};
