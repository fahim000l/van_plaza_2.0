import { useQuery } from "@tanstack/react-query";

const useGetPsByProductId = (productId) => {
  const {
    data: sps_product,
    refetch: sps_product_refetch,
    isLoading: sps_product_loading,
  } = useQuery({
    queryKey: ["/api/get-ps-by-productId", productId],
    queryFn: async () => {
      if (productId) {
        return await fetch(
          `/api/get-ps-by-productId?productId=${productId}`
        ).then((res) => res.json());
      }
    },
  });

  return { sps_product, sps_product_refetch, sps_product_loading };
};

export default useGetPsByProductId;
