import { useQuery } from "@tanstack/react-query";

const useGetQsByProductIdSizeId = (productId, sizeId) => {
  const {
    data: qps_product_size,
    refetch: qps_product_size_refetch,
    isLoading: qps_product_size_loading,
  } = useQuery({
    queryKey: ["/api/get-qs-by-productId_sizeId", productId, sizeId],
    queryFn: async () => {
      if (productId && sizeId) {
        return await fetch(
          `/api/get-qs-by-productId_sizeId?productId=${productId}&sizeId=${sizeId}`
        ).then((res) => res.json());
      }
    },
  });

  return {
    qps_product_size,
    qps_product_size_refetch,
    qps_product_size_loading,
  };
};

export default useGetQsByProductIdSizeId;
