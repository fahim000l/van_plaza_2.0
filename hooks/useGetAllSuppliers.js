import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllSuppliers = () => {
  const {
    data: suppliers,
    refetch: suppliersRefetch,
    isLoading: suppliersLoading,
  } = useQuery({
    queryKey: ["/api/get-all-suppliers"],
    queryFn: () => fetch("/api/get-all-suppliers").then((res) => res.json()),
  });

  return { suppliers, suppliersRefetch, suppliersLoading };
};

export default useGetAllSuppliers;
