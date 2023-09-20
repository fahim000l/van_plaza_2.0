import { useQuery } from "@tanstack/react-query";

const useGetCartsByQpId = (qpId) => {
  const {
    data: carts,
    refetch: cartsRefetch,
    isLoading: cartsLoading,
  } = useQuery({
    queryKey: ["/api/get-carts-by-qpId", qpId],
    queryFn: async () => {
      if (qpId) {
        return await fetch(`/api/get-carts-by-qpId?qpId=${qpId}`).then((res) =>
          res.json()
        );
      } else {
        return [];
      }
    },
  });

  return { carts, cartsRefetch, cartsLoading };
};

export default useGetCartsByQpId;
