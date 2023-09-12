import { useQuery } from "@tanstack/react-query";

const useGetQsByInvoiceIdProductIdSizeId = (invoiceId, productId, sizeId) => {
  const {
    data: qp_invoice_product_size,
    refetch: qp_invoice_product_size_refetch,
    isLoading: qp_invoice_product_size_loading,
  } = useQuery({
    queryKey: [
      "/api/get-qs-by-invoiceId-productId-sizeId",
      invoiceId,
      productId,
      sizeId,
    ],
    queryFn: async () => {
      if (invoiceId && productId && sizeId) {
        return await fetch(
          `/api/get-qs-by-invoiceId-productId-sizeId?invoiceId=${invoiceId}&productId=${productId}&sizeId=${sizeId}`
        ).then((res) => res.json());
      }

      return { quantity: 0 };
    },
  });

  return {
    qp_invoice_product_size,
    qp_invoice_product_size_refetch,
    qp_invoice_product_size_loading,
  };
};

export default useGetQsByInvoiceIdProductIdSizeId;
