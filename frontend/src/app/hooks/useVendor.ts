import { useQuery } from "@tanstack/react-query";
import { getVendor } from "../services/vendor";

export function useVendor(id: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => getVendor(id),
  });
  return { vendor: data, isPending, isError };
}
