import { useQuery } from "@tanstack/react-query";

const useGetQsByProductId = (productId) => {
  const {
    data: qps_product,
    refetch: qps_product_refetch,
    isLoading: qps_loading,
  } = useQuery({
    queryKey: ["/api/get-qs-by-productId", productId],
    queryFn: async () => {
      if (productId) {
        return await fetch(
          `/api/get-qs-by-productId?productId=${productId}`
        ).then((res) => res.json());
      }
    },
  });

  return { qps_loading, qps_product, qps_product_refetch };
};

export default useGetQsByProductId;
