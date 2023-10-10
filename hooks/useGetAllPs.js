import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllPs = (categoryId, search) => {
  const {
    data: sps,
    refetch: spsRefetch,
    isLoading: spsLoading,
  } = useQuery({
    queryKey: ["/api/get-all-ps", categoryId, search],
    queryFn: () =>
      fetch(`/api/get-all-ps?categoryId=${categoryId}&search=${search}`).then(
        (res) => res.json()
      ),
  });

  return { sps, spsRefetch, spsLoading };
};

export default useGetAllPs;
