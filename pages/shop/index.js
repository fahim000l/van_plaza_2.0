import ProductCard from "@/components/ProductCard";
import SizeSelectModal from "@/components/SizeSelectModal";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetAllPs from "@/hooks/useGetAllPs";
import Main from "@/layouts/Main";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import SideFilter from "@/components/shop/SideFilter";

const Shop = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  console.log(selectedPriceRange);
  const { sps, spsLoading, spsRefetch } = useGetAllPs(
    "",
    "*",
    selectedPriceRange,
    maxPrice,
    minPrice
  );
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Main>
      <div className="flex">
        <SideFilter
          spsRefetch={spsRefetch}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedPriceRange={selectedPriceRange}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <div className="lg:mx-20 my-10 mx-2 w-[80%]">
          {spsLoading && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 ">
              {[1, 2, 3, 4, 5, 6, 7, 8]?.map((anti) => (
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={300}
                  key={anti}
                />
              ))}
            </div>
          )}
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
