import { useQuery } from "@tanstack/react-query";

const useGetPsByInvoiceId = (invoiceId) => {
  const {
    data: sps_invoice,
    refetch: sps_invoice_refetch,
    isLoading: sps_invoice_loading,
  } = useQuery({
    queryKey: ["/api/get-ps-by-invoiceId", invoiceId],
    queryFn: async () => {
      if (invoiceId) {
        return await fetch(
          `/api/get-ps-by-invoiceId?invoiceId=${invoiceId}`
        ).then((res) => res.json());
      }

      return [];
    },
  });

  return { sps_invoice, sps_invoice_refetch, sps_invoice_loading };
};

export default useGetPsByInvoiceId;
