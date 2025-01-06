import { useQuery } from "@tanstack/react-query";
import { fetchCustomerData } from "../api/apiService";

export const useFetchCustomerQuery = () => {
  return useQuery({
    queryKey: ["customerData"],
    queryFn: fetchCustomerData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
};
