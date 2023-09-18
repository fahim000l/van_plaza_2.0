import ProductCard from "@/components/ProductCard";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetAllPs from "@/hooks/useGetAllPs";
import Main from "@/layouts/Main";
import React, { useEffect } from "react";

const Shop = () => {
  // const { products } = useGetAllProducts();
  const { sps } = useGetAllPs();

  return (
    <Main>
      <div className="lg:mx-20 my-10 mx-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 ">
          {sps?.map((sp) => (
            <ProductCard sp={sp} key={sp?._id} />
          ))}
        </div>
      </div>
    </Main>
  );
};

export default Shop;
