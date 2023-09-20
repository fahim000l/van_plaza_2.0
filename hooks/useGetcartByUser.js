import { useQuery } from "@tanstack/react-query";

const useGetcartByUser = (user) => {
  const {
    data: carts_user,
    refetch: carts_user_refetch,
    isLoading: carts_user_loading,
  } = useQuery({
    queryKey: ["/api/get-cats-by-user", user],
    queryFn: async () => {
      if (user) {
        return await fetch(`/api/get-carts-by-user?user=${user}`).then((res) =>
          res.json()
        );
      } else {
        return [];
      }
    },
  });

  return { carts_user, carts_user_refetch, carts_user_loading };
};

export default useGetcartByUser;
