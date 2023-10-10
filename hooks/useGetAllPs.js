import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllPs = (categoryId) => {
  const {
    data: sps,
    refetch: spsRefetch,
    isLoading: spsLoading,
  } = useQuery({
    queryKey: ["/api/get-all-ps", categoryId],
    queryFn: () =>
      fetch(`/api/get-all-ps?categoryId=${categoryId}`).then((res) =>
        res.json()
      ),
  });

  return { sps, spsRefetch, spsLoading };
};

export default useGetAllPs;
