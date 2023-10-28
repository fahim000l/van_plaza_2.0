import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button,
  Divider,
} from "@mui/material";
import { Rectangle, Cancel } from "@mui/icons-material";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import AutoSelect from "../common_auto-complete";

const SideFilter = ({
  selectedPriceRange,
  setSelectedPriceRange,
  spsRefetch,
  setMaxPrice,
  setMinPrice,
  setSearch,
  setCategoryId,
}) => {
  const { categories } = useGetAllCategories();

  const handlePriceRange = (e) => {
    e.preventDefault();

    const form = e.target;
    setMinPrice(form.minPrice.value);
    setMaxPrice(form.maxPrice.value);
  };

  const colorGroups = [
    "aqua",
    "blue",
    "darkblue",
    "lightblue",
    "brown",
    "cyan",
    "darkcyan",
    "lightcyan",
    "gray",
    "darkgray",
    "lightgray",
    "green",
    "darkgreen",
    "lightgreen",
    "orange",
    "darkorange",
    "pink",
    "lightpink",
    "purple",
    "red",
    "darkred",
    "yellow",
    "lightyellow",
    "black",
    "white",
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Filters</p>
        <label
          htmlFor="filterDrawer"
          className="btn btn-sm btn-circle drawer-button lg:hidden"
        >
          <Cancel />
        </label>
      </div>
      <div className="my-2">
        <p>Price</p>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            value={selectedPriceRange}
            label="Age"
            onChange={(e) => {
              setSelectedPriceRange(e.target.value);
              spsRefetch();
            }}
          >
            <MenuItem value={0}>Default</MenuItem>
            <MenuItem value={-1}>High to Low</MenuItem>
            <MenuItem value={1}>Low to High</MenuItem>
            <MenuItem value={"Custom"}>Custom</MenuItem>
          </Select>
        </FormControl>
        {selectedPriceRange === "Custom" && (
          <form
            onSubmit={handlePriceRange}
            className="flex items-center my-2 space-x-2"
          >
            <TextField
              name="minPrice"
              placeholder="min"
              type="number"
              size="small"
            />
            <span>-</span>{" "}
            <TextField
              name="maxPrice"
              placeholder="max"
              type="number"
              size="small"
            />{" "}
            <Button
              type="submit"
              size="small"
              variant="contained"
              className="bg-[#222745]"
            >
              Apply
            </Button>
          </form>
        )}
      </div>
      <Divider />
      <div className="my-2">
        <p>Category</p>
        <AutoSelect
          size={"small"}
          className={"rounded-lg"}
          options={categories}
          onChange={(event, newValue) => setCategoryId(newValue?._id)}
          globalLabel={"categoryName"}
        />
      </div>
      <Divider />
      <div className="my-2">
        <p>Color</p>
        <div className="grid grid-cols-2 gap-2 my-2">
          {colorGroups?.map((color) => (
            <div
              onClick={() => setSearch(color)}
              className={`bg-base-300 cursor-pointer rounded-lg flex`}
            >
              <Rectangle
                sx={{ color: color, width: "50px", marginX: 0, paddingX: 0 }}
              />
              {color}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
