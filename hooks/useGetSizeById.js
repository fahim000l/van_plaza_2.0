import { useQuery } from "@tanstack/react-query";

const useGetSizeById = (sizeId) => {
  const {
    data: size,
    refetch: sizeRefetch,
    isLoading: sizeLoading,
  } = useQuery({
    queryKey: ["/api/get-size-by-id", sizeId],
    queryFn: async () => {
      if (sizeId) {
        return await fetch(`/api/get-size-by-id?sizeId=${sizeId}`).then((res) =>
          res.json()
        );
      }

      return null;
    },
  });

  return { size, sizeRefetch, sizeLoading };
};

export default useGetSizeById;
