import { useQuery } from "@tanstack/react-query";

const useGetQsByProductIdInvoiceId = (productId, invoiceId) => {
  const {
    data: qps_product_invoice,
    refetch: qps_product_invoice_refetch,
    isLoading: qps_product_invoice_loading,
  } = useQuery({
    queryKey: ["/api/get-qs-by-productId-invoiceId", productId, invoiceId],
    queryFn: async () => {
      if (productId && invoiceId) {
        return await fetch(
          `/api/get-qs-by-productId-invoiceId?productId=${productId}&invoiceId=${invoiceId}`
        ).then((res) => res.json());
      }

      return null;
    },
  });

  return {
    qps_product_invoice,
    qps_product_invoice_refetch,
    qps_product_invoice_loading,
  };
};

export default useGetQsByProductIdInvoiceId;
