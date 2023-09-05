import { useQuery } from "@tanstack/react-query";

const useGetSizesByCategory = (categoryId) => {
  const {
    data: sizes_category,
    refetch: sizes_category_refetch,
    isLoading: sizeses_category_loading,
  } = useQuery({
    queryKey: ["/api/get-sizes-by-category", categoryId],
    queryFn: async () => {
      if (categoryId) {
        return await fetch(`/api/get-sizes-by-category`).then((res) =>
          res.json()
        );
      }
      return [];
    },
  });

  return { sizes_category, sizes_category_refetch, sizeses_category_loading };
};

export default useGetSizesByCategory;
