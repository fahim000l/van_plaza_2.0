import React, { useContext, useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import { Autocomplete } from "@mui/lab";
import useGetAllSuppliers from "@/hooks/useGetAllSuppliers";
import { STOCK_IN_CONTEXT } from "@/contexts/StockInProvider";
import usegetSupplierById from "@/hooks/usegetSupplierById";

const SupplierIn = () => {
  const { suppliers } = useGetAllSuppliers();
  const { Formik } = useContext(STOCK_IN_CONTEXT);

  const { supplier } = usegetSupplierById(Formik?.values?.supplierId);

  return (
    <div>
      <p className="text-2xl font-bold text-start">Invoice Info</p>
      <div>
        <div className="flex justify-between my-2">
          <Autocomplete
            className="mx-2"
            size="small"
            id="country-select-demo"
            fullWidth
            options={suppliers}
            onChange={(event, newOption) => {
              Formik.setFieldValue("supplierId", newOption?._id);
            }}
            autoHighlight
            // onChange={(event, newValue) => setSelectedSupplier(newValue)}
            getOptionLabel={(option) => option.supplierName}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.supplierName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                name="category"
                fullWidth
                {...params}
                className="bg-white my-2"
                label="Select Supplier"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <TextField
            fullWidth
            size="small"
            disabled={!Formik?.values?.supplierId}
            value={Formik?.values?.supplierId ? supplier?.contactInfo : ""}
            placeholder="Contact Info"
            className="mx-2 bg-white"
          />
        </div>
        <div className="flex justify-between my-2">
          <TextField
            fullWidth
            disabled={!Formik?.values?.supplierId}
            value={`${new Date().getDate()}-${
              new Date().getMonth() + 1
            }-${new Date().getFullYear()}`}
            size="small"
            placeholder="Date"
            className="mx-2 bg-white"
          />
          <TextField
            disabled={!Formik?.values?.supplierId}
            defaultValue={new Date().getTime()}
            fullWidth
            size="small"
            placeholder="Trans Id"
            className="mx-2 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierIn;
