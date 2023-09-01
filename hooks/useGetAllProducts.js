import { useQuery } from "@tanstack/react-query";

const useGetAllProducts = () => {
  const {
    data: products = [],
    refetch: productsRefetch,
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["/api/get-all-products"],
    queryFn: () => fetch("/api/get-all-products").then((res) => res.json()),
  });

  return { products, productsRefetch, productsLoading };
};

export default useGetAllProducts;
