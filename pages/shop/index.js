import ProductCard from "@/components/ProductCard";
import SizeSelectModal from "@/components/SizeSelectModal";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetAllPs from "@/hooks/useGetAllPs";
import Main from "@/layouts/Main";
import React, { useEffect, useState } from "react";

const Shop = () => {
  const { sps } = useGetAllPs();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Main>
      <div className="lg:mx-20 my-10 mx-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 ">
          {sps?.map((sp) => (
            <ProductCard
              setSelectedProduct={setSelectedProduct}
              sp={sp}
              key={sp?._id}
            />
          ))}
        </div>
      </div>
      {selectedProduct && (
        <SizeSelectModal
          setSelectedProduct={setSelectedProduct}
          selectedSp={selectedProduct}
        />
      )}
    </Main>
  );
};

export default Shop;
