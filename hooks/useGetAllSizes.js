import { useQuery } from "@tanstack/react-query";

const useGetAllSizes = () => {
  const {
    data: sizes,
    refetch: sizesRefetch,
    isLoading: sizesLoading,
  } = useQuery({
    queryKey: [],
    queryFn: () => fetch("/api/get-all-sizes").then((res) => res.json()),
  });

  return { sizes, sizesRefetch, sizesLoading };
};

export default useGetAllSizes;
