import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllInvoices = () => {
  const {
    data: invoices,
    refetch: invoicesRefetch,
    isLoading: invoicesLoading,
  } = useQuery({
    queryKey: ["/api/get-all-invoices"],
    queryFn: () => fetch("/api/get-all-invoices").then((res) => res.json()),
  });

  return { invoices, invoicesRefetch, invoicesLoading };
};

export default useGetAllInvoices;
