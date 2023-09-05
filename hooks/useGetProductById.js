import { useQuery } from "@tanstack/react-query";

const useGetProductById = (productId) => {
  const {
    data: product,
    refetch: productRefetch,
    isLoading: productLoading,
  } = useQuery({
    queryKey: ["/api/get-product-by-id", productId],
    queryFn: async () => {
      if (productId) {
        return await fetch(
          `/api/get-product-by-id?productId=${productId}`
        ).then((res) => res.json());
      }

      return null;
    },
  });

  return { product, productRefetch, productLoading };
};

export default useGetProductById;
