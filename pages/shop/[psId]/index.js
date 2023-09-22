import useGetPsById from "@/hooks/useGetPsById";
import Main from "@/layouts/Main";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const OnSaleProductDetails = () => {
  const { query } = useRouter();

  const { ps } = useGetPsById(query?.psId);

  useEffect(() => {
    if (ps) {
      console.log(ps);
    }
  }, [ps]);

  return <Main>Ps Id {query?.psId}</Main>;
};

export default OnSaleProductDetails;
