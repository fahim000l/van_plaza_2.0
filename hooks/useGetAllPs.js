import { useQuery } from "@tanstack/react-query";

const useGetAllPs = (
  categoryId,
  search,
  priceStatus,
  maxPrice,
  minPrice,
  sizeId
) => {
  const {
    data: sps,
    refetch: spsRefetch,
    isLoading: spsLoading,
  } = useQuery({
    queryKey: [
      "/api/get-all-ps",
      categoryId,
      search,
      priceStatus,
      maxPrice,
      minPrice,
      sizeId,
    ],
    queryFn: () =>
      fetch(
        `/api/get-all-ps?categoryId=${categoryId}&search=${search}&priceStatus=${priceStatus}&maxPrice=${maxPrice}&minPrice=${minPrice}&sizeId=${sizeId}`
      ).then((res) => res.json()),
  });

  return { sps, spsRefetch, spsLoading };
};

export default useGetAllPs;
