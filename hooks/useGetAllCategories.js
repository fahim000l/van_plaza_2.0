import { useQuery } from "@tanstack/react-query";

const useGetAllCategories = () => {
  const {
    data: categories = [],
    refetch: categoriesRefetch,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["/api/get-all-categories"],
    queryFn: () => fetch("/api/get-all-categories").then((res) => res.json()),
  });

  return { categories, categoriesRefetch, categoriesLoading };
};

export default useGetAllCategories;
