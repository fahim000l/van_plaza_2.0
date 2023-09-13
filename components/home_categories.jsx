import useGetAllCategories from "@/hooks/useGetAllCategories";
import React from "react";
import HomeCategoryCard from "./HomeCategoryCard";
import { Button } from "@mui/joy";
import { KeyboardDoubleArrowRightSharp } from "@mui/icons-material";

const HomeCategories = () => {
  const { categories } = useGetAllCategories(8);

  return (
    <div className="grid card bg-[steelblue] rounded-box p-10">
      <Button
        endDecorator={<KeyboardDoubleArrowRightSharp />}
        className="w-32 mb-5 bg-white text-black hover:text-white"
      >
        See More
      </Button>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {categories?.map((category) => (
          <HomeCategoryCard key={category?._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
