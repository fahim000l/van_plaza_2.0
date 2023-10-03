import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllOrders = (status) => {
  const {
    data: orders,
    refetch: ordersRefetch,
    isLoading: ordersLoading,
  } = useQuery({
    queryKey: ["get-all-orders", status],
    queryFn: async () => {
      if (status) {
        return await fetch(`/api/get-all-orders?status=${status}`).then((res) =>
          res.json()
        );
      } else {
        return await fetch(`/api/get-all-orders`).then((res) => res.json());
      }
    },
  });

  return { orders, ordersRefetch, ordersLoading };
};

export default useGetAllOrders;
