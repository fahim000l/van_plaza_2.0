import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import SizeSelectModal from "./SizeSelectModal";

const HomeFav = () => {
  const {
    authUser: { ops },
  } = useContext(AUTH_CONTEXT);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="grid lg:card bg-base-200 lg:rounded-box lg:mx-20 mx-0 my-10 lg:p-10 p-2">
      <div className="flex justify-between">
        <p className="font-bold text-[steelblue] mb-2">Only for you</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2">
        {ops?.map((op) =>
          op?.categoryInfo?.[0]?.sps?.map((sp) => (
            <ProductCard
              setSelectedProduct={setSelectedProduct}
              sp={sp}
              key={sp?._id}
            />
          ))
        )}
      </div>
      {selectedProduct && (
        <SizeSelectModal
          setSelectedProduct={setSelectedProduct}
          selectedSp={selectedProduct}
        />
      )}
    </div>
  );
};

export default HomeFav;
