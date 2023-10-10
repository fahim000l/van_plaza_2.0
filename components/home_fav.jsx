import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext } from "react";
import ProductCard from "./ProductCard";

const HomeFav = () => {
  const {
    authUser: { ops },
  } = useContext(AUTH_CONTEXT);

  return (
    <div className="grid card bg-base-200 lg:rounded-box lg:mx-20 my-10 mx-2 lg:p-10 p-2">
      <div className="flex justify-between">
        <p className="font-bold text-[steelblue]">Only for you</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2">
        {ops?.map((op) => {
          return op?.categoryInfo?.[0]?.sps?.map((sp) => (
            <ProductCard sp={sp} />
          ));
        })}
      </div>
    </div>
  );
};

export default HomeFav;
