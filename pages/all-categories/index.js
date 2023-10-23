import HomeCategoryCard from "@/components/HomeCategoryCard";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import Main from "@/layouts/Main";
import React from "react";
import { Skeleton } from "@mui/material";

const index = () => {
  const { categories, categoriesLoading } = useGetAllCategories("");

  return (
    <Main>
      <div className="lg:mx-20 my-10 mx-2">
        {categoriesLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]?.map((anti, i) => (
              <Skeleton
                variant="rectangular"
                width={210}
                height={118}
                key={i}
              />
            ))}
          </div>
        )}
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
