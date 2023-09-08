import { useQuery } from "@tanstack/react-query";

const useGetInvoiceById = (invoiceId) => {
  const {
    data: invoice,
    refetch: invoiceRefetch,
    isLoading: invoiceLoading,
  } = useQuery({
    queryKey: ["/api/get-invoice-by-id", invoiceId],
    queryFn: async () => {
      if (invoiceId) {
        return await fetch(
          `/api/get-invoice-by-id?invoiceId=${invoiceId}`
        ).then((res) => res.json());
      }
    },
  });

  return { invoice, invoiceRefetch, invoiceLoading };
};

export default useGetInvoiceById;
