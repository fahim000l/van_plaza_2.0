import { useQuery } from "@tanstack/react-query";

const useGetAllCategories = (limit) => {
  const {
    data: categories = [],
    refetch: categoriesRefetch,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["/api/get-all-categories", limit],
    queryFn: async () => {
      if (limit) {
        return await fetch(`/api/get-all-categories?limit=${limit}`).then(
          (res) => res.json()
        );
      } else {
        return await fetch(`/api/get-all-categories`).then((res) => res.json());
      }
    },
  });

  return { categories, categoriesRefetch, categoriesLoading };
};

export default useGetAllCategories;
