import useGetAllCategories from "@/hooks/useGetAllCategories";
import React from "react";
import HomeCategoryCard from "./HomeCategoryCard";
import { Button } from "@mui/joy";
import { KeyboardDoubleArrowRightSharp } from "@mui/icons-material";
import Link from "next/link";
import { Skeleton } from "@mui/material";

const HomeCategories = () => {
  const { categories, categoriesLoading } = useGetAllCategories(8);

  return (
    <div className="grid lg:card bg-[#C5ACED] lg:rounded-box lg:p-10 p-5">
      <div className="flex justify-between">
        <p className="text-white font-bold">Categories</p>
        <Link href={"/all-categories"}>
          <Button
            size={"sm"}
            endDecorator={<KeyboardDoubleArrowRightSharp />}
            className="w-32 mb-5 bg-white text-black hover:text-white"
          >
            See More
          </Button>
        </Link>
      </div>
      {categoriesLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((anti, i) => (
            <Skeleton variant="rectangular" width={210} height={118} key={i} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2">
        {categories?.map((category) => (
          <HomeCategoryCard key={category?._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
