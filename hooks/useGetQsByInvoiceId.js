import { useQuery } from "@tanstack/react-query";

const useGetQsByInvoiceId = (invoiceId) => {
  const {
    data: qps_invoice,
    refetch: qps_invoice_refetch,
    isLoading: qps_invoice_loading,
  } = useQuery({
    queryKey: ["/api/get-qs-by-invoiceId", invoiceId],
    queryFn: async () => {
      if (invoiceId) {
        return await fetch(
          `/api/get-qs-by-invoiceId?invoiceId=${invoiceId}`
        ).then((res) => res.json());
      }
    },
  });

  return { qps_invoice, qps_invoice_refetch, qps_invoice_loading };
};

export default useGetQsByInvoiceId;
