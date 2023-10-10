import useGetAllCategories from "@/hooks/useGetAllCategories";
import React from "react";
import HomeCategoryCard from "./HomeCategoryCard";
import { Button } from "@mui/joy";
import { KeyboardDoubleArrowRightSharp } from "@mui/icons-material";
import Link from "next/link";

const HomeCategories = () => {
  const { categories } = useGetAllCategories(8);

  return (
    <div className="grid lg:card bg-[steelblue] lg:rounded-box lg:p-10 p-5">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2">
        {categories?.map((category) => (
          <HomeCategoryCard key={category?._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
