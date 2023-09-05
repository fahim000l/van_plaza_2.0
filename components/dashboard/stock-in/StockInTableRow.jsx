import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TableRow,
  TableCell,
  Box,
  Avatar,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import { Autocomplete } from "@mui/lab";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import { RestartAlt } from "@mui/icons-material";
import { STOCK_IN_CONTEXT } from "@/contexts/StockInProvider";
import useGetProductById from "@/hooks/useGetProductById";

const StockInTableRow = ({ record, i, setRecords, records }) => {
  const { products } = useGetAllProducts();
  const { Formik } = useContext(STOCK_IN_CONTEXT);
  const [flaw1img, setFlaw1img] = useState("");
  const [flaw2img, setFlaw2img] = useState("");
  const [flaw3img, setFlaw3img] = useState("");

  const flaw1Ref = useRef();
  const flaw2Ref = useRef();
  const flaw3Ref = useRef();
  const { product } = useGetProductById(
    Formik.values.stockProducts[i]?.productId
  );

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">
        <Chip label={i + 1} />
      </TableCell>
      <TableCell align="center">
        <Autocomplete
          disabled={!Formik?.values?.supplierId}
          className="mx-2"
          size="small"
          id="country-select-demo"
          sx={{ width: 200 }}
          fullWidth
          onChange={(event, newValue) => {
            const updatedStockProducts = [...Formik.values.stockProducts];
            const updatedProduct = {
              ...updatedStockProducts[i],
              productId: newValue?._id,
            };
            updatedStockProducts[i] = updatedProduct;
            Formik.setFieldValue("stockProducts", updatedStockProducts);
          }}
          options={products}
          autoHighlight
          getOptionLabel={(option) => option.productName}
          renderOption={(props, option) => (
            <Box
              className={`${
                records?.find((r) => r.productId === option?._id)
                  ? "hidden"
                  : ""
              }`}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`/uploads/images/products/${option?.standardImage}`}
                alt=""
              />
              {option.productName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              name="category"
              fullWidth
              {...params}
              className="bg-white my-2"
              label="Select Product"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </TableCell>
      <TableCell align="center">
        <div className="avatar">
          <div className="w-8 rounded">
            <img
              src={
                product
                  ? `/uploads/images/products/${product?.standardImage}`
                  : "/common/no_image.png"
              }
            />
          </div>
        </div>
      </TableCell>
      <TableCell align="center">
        <div className="flex items-center">
          <input
            disabled={!product}
            onChange={(event) => {
              const blob = new Blob([event.target.files[0]], {
                type: event.target.files[0].type,
              });
              const fileWithCustomName = new File(
                [blob],
                product.productName.replaceAll(" ", "_"),
                {
                  type: event.target.files[0].type,
                }
              );
              setFlaw1img(URL.createObjectURL(event.target.files[0]));

              const updatedStockProducts = [...Formik.values.stockProducts];
              const updatedProduct = {
                ...updatedStockProducts[i],
                flaw1: fileWithCustomName,
              };
              updatedStockProducts[i] = updatedProduct;
              Formik.setFieldValue("stockProducts", updatedStockProducts);
            }}
            ref={flaw1Ref}
            type="file"
            className="hidden"
          />
          <div onClick={() => flaw1Ref.current.click()} className="avatar mx-2">
            <div className="w-8 rounded">
              <img src={flaw1img || "/common/no_image.png"} />
            </div>
          </div>
          <input
            onChange={(event) => {
              setFlaw2img(URL.createObjectURL(event.target.files[0]));
              const blob = new Blob([event.target.files[0]], {
                type: event.target.files[0].type,
              });
              const fileWithCustomName = new File(
                [blob],
                product.productName.replaceAll(" ", "_"),
                {
                  type: event.target.files[0].type,
                }
              );
              const updatedStockProducts = [...Formik.values.stockProducts];
              const updatedProduct = {
                ...updatedStockProducts[i],
                flaw2: fileWithCustomName,
              };
              updatedStockProducts[i] = updatedProduct;
              Formik.setFieldValue("stockProducts", updatedStockProducts);
            }}
            disabled={!product}
            ref={flaw2Ref}
            type="file"
            className="hidden"
          />
          <div onClick={() => flaw2Ref.current.click()} className="avatar mx-2">
            <div className="w-8 rounded">
              <img src={flaw2img || "/common/no_image.png"} />
            </div>
          </div>
          <input
            onChange={(event) => {
              const blob = new Blob([event.target.files[0]], {
                type: event.target.files[0].type,
              });
              const fileWithCustomName = new File(
                [blob],
                product.productName.replaceAll(" ", "_"),
                {
                  type: event.target.files[0].type,
                }
              );
              setFlaw3img(URL.createObjectURL(event.target.files[0]));
              const updatedStockProducts = [...Formik.values.stockProducts];
              const updatedProduct = {
                ...updatedStockProducts[i],
                flaw3: fileWithCustomName,
              };
              updatedStockProducts[i] = updatedProduct;
              Formik.setFieldValue("stockProducts", updatedStockProducts);
              console.log(records);
            }}
            disabled={!product}
            ref={flaw3Ref}
            type="file"
            className="hidden"
          />
          <div onClick={() => flaw3Ref.current.click()} className="avatar mx-2">
            <div className="w-8 rounded">
              <img src={flaw3img || "/common/no_image.png"} />
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell align="center">
        <TextField
          disabled={!product}
          defaultValue={product?.buyPrice || 0}
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          disabled={!product}
          defaultValue={product?.sellPrice || 0}
          size="small"
        />
      </TableCell>
      <TableCell size="small" align="center">
        <IconButton>
          <Chip label={"10"} />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <IconButton size="small" className="bg-info text-primary">
          <RestartAlt />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default StockInTableRow;
