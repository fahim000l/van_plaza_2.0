import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllPs = (categoryId, search, priceStatus, maxPrice, minPrice) => {
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
    ],
    queryFn: () =>
      fetch(
        `/api/get-all-ps?categoryId=${categoryId}&search=${search}&priceStatus=${priceStatus}&maxPrice=${maxPrice}&minPrice=${minPrice}`
      ).then((res) => res.json()),
  });

  return { sps, spsRefetch, spsLoading };
};

export default useGetAllPs;
