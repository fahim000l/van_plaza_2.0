import { useQuery } from "@tanstack/react-query";

const useGetCategoryById = (categoryId) => {
  const {
    data: category,
    refetch: categoryrefetch,
    isLoading: categoryLoading,
  } = useQuery({
    queryKey: ["/api/get-caregory-by-id", categoryId],
    queryFn: async () => {
      if (categoryId) {
        return await fetch(
          `/api/get-caregory-by-id?categoryId=${categoryId}`
        ).then((res) => res.json());
      }

      return null;
    },
  });

  return { category, categoryrefetch, categoryLoading };
};

export default useGetCategoryById;
