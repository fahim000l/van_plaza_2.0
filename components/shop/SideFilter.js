import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button,
  Divider,
} from "@mui/material";

const SideFilter = ({
  selectedPriceRange,
  setSelectedPriceRange,
  spsRefetch,
  setMaxPrice,
  setMinPrice,
}) => {
  const handlePriceRange = (e) => {
    e.preventDefault();

    const form = e.target;
    setMinPrice(form.minPrice.value);
    setMaxPrice(form.maxPrice.value);
  };

  return (
    <div className="bg-[#C5ACED] w-[25%] p-5">
      <p className="text-2xl font-bold">Filters</p>
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
        <p>Color</p>
      </div>
    </div>
  );
};

export default SideFilter;
