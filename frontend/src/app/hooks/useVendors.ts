import { useQuery } from "@tanstack/react-query";
import { getVendors } from "../services/vendor";

export function useVendors() {
  const {
    data = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => getVendors(),
  });

  return { vendors: data, isPending, isError };
}
