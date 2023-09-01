import { useQuery } from "@tanstack/react-query";

const useGetDbUser = (userEmail) => {
  const {
    data: dbUser,
    refetch: dbUserRefetch,
    isLoading: dbUserLoading,
  } = useQuery({
    queryKey: ["/api/get-db_user", userEmail],
    queryFn: () =>
      fetch(`/api/get-db_user?email=${userEmail}`).then((res) => res.json()),
  });

  return { dbUser, dbUserRefetch, dbUserLoading };
};

export default useGetDbUser;
