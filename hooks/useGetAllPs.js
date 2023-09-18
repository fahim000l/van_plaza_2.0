import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllPs = () => {
  const {
    data: sps,
    refetch: spsRefetch,
    isLoading: spsLoading,
  } = useQuery({
    queryKey: ["/api/get-all-ps"],
    queryFn: () => fetch("/api/get-all-ps").then((res) => res.json()),
  });

  return { sps, spsRefetch, spsLoading };
};

export default useGetAllPs;
