import HomeCategoryCard from "@/components/HomeCategoryCard";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import Main from "@/layouts/Main";
import React from "react";

const index = () => {
  const { categories } = useGetAllCategories("");

  return (
    <Main>
      <div className="lg:mx-20 my-10 mx-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2">
          {categories?.map((category) => (
            <HomeCategoryCard key={category?._id} category={category} />
          ))}
        </div>
      </div>
    </Main>
  );
};

export default index;
