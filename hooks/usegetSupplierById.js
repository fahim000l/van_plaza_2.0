import { useQuery } from "@tanstack/react-query";

const usegetSupplierById = (supplierId) => {
  const {
    data: supplier,
    refetch: supplierRefetch,
    isLoading: supplierLoading,
  } = useQuery({
    queryKey: ["/api/get-supplier-by-id", supplierId],
    queryFn: async () => {
      if (supplierId) {
        return await fetch(
          `/api/get-supplier-by-id?supplierId=${supplierId}`
        ).then((res) => res.json());
      }

      return null;
    },
  });

  return { supplier, supplierRefetch, supplierLoading };
};

export default usegetSupplierById;
