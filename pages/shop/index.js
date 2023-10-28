import ProductCard from "@/components/ProductCard";
import SizeSelectModal from "@/components/SizeSelectModal";
import useGetAllPs from "@/hooks/useGetAllPs";
import Main from "@/layouts/Main";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import SideFilter from "@/components/shop/SideFilter";
import { Chip } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

const Shop = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [search, setSearch] = useState("*");
  const [categoryId, setCategoryId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const { sps, spsLoading, spsRefetch } = useGetAllPs(
    categoryId?.categoryId || "",
    search,
    selectedPriceRange,
    maxPrice,
    minPrice,
    sizeId?.sizeId || ""
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
              <FilterAlt />
              Filter
            </label>
            <div className="my-2 flex space-x-2">
              {categoryId && (
                <Chip
                  onDelete={() => setCategoryId(null)}
                  label={categoryId?.categoryName}
                />
              )}
              {sizeId && (
                <Chip
                  onDelete={() => setSizeId(null)}
                  label={sizeId?.sizeName}
                />
              )}
              {search !== "*" && (
                <Chip onDelete={() => setSearch("*")} label={search} />
              )}
              {selectedPriceRange !== 0 && (
                <Chip
                  onDelete={() => setSelectedPriceRange(0)}
                  label={
                    selectedPriceRange === 1
                      ? "Low to high"
                      : selectedPriceRange === -1
                      ? "high to low"
                      : selectedPriceRange
                  }
                />
              )}
            </div>
            {spsLoading && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 ">
                {[1, 2, 3, 4, 5, 6, 7, 8]?.map((anti) => (
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={200}
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
              setSizeId={setSizeId}
              categoryId={categoryId}
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
