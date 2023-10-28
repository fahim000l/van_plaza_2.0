import ProductCard from "@/components/ProductCard";
import SizeSelectModal from "@/components/SizeSelectModal";
import useGetAllPs from "@/hooks/useGetAllPs";
import Main from "@/layouts/Main";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import SideFilter from "@/components/shop/SideFilter";
import { Cancel } from "@mui/icons-material";

const Shop = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [search, setSearch] = useState("*");
  const [categoryId, setCategoryId] = useState("");
  const { sps, spsLoading, spsRefetch } = useGetAllPs(
    categoryId,
    search,
    selectedPriceRange,
    maxPrice,
    minPrice
  );
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Main>
      <div className="drawer lg:drawer-open">
        <input id="filterDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="my-10 mx-2">
            <label
              htmlFor="filterDrawer"
              className="btn btn-outline btn-sm mb-2 btn-ghost w-full drawer-button lg:hidden"
            >
              Filter
            </label>
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
        <div className="drawer-side">
          <label
            htmlFor="filterDrawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="p-4 py-20 lg:py-10 w-80 h-screen text-base-content bg-[#C5ACED] overflow-y-scroll">
            {/* Sidebar content here */}

            <SideFilter
              setCategoryId={setCategoryId}
              spsRefetch={spsRefetch}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedPriceRange={selectedPriceRange}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              setSearch={setSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex"></div>
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
