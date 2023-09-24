import { useQuery } from "@tanstack/react-query";

const useGetPsById = (psId) => {
  const {
    data: ps,
    refetch: psRefetch,
    isLoading: psLoading,
  } = useQuery({
    queryKey: ["/api/get-ps-by-id", psId],
    queryFn: async () => {
      if (psId) {
        return await fetch(`/api/get-ps-by-id?psId=${psId}`).then((res) =>
          res.json()
        );
      } else {
        return [];
      }
    },
  });

  return { ps, psRefetch, psLoading };
};

export default useGetPsById;
