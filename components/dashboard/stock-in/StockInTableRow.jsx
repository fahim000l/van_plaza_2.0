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
import QuantityInDrawer from "./QuantityInDrawer";
import AutoSelect from "@/components/common_auto-complete";

const StockInTableRow = ({ record, i, setRecords, records }) => {
  const { products } = useGetAllProducts();
  const selectProductRef = useRef(null);
  const { Formik, handleUploadImage } = useContext(STOCK_IN_CONTEXT);
  const [flaw1img, setFlaw1img] = useState("");
  const [flaw2img, setFlaw2img] = useState("");
  const [flaw3img, setFlaw3img] = useState("");

  const flaw1Ref = useRef();
  const flaw2Ref = useRef();
  const flaw3Ref = useRef();
  const { product, productRefetch } = useGetProductById(
    Formik.values.stockProducts[i]?.productId
  );

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">
        <Chip label={i + 1} />
      </TableCell>
      <TableCell align="center">
        <AutoSelect
          ref={selectProductRef}
          disabled={!Formik?.values?.supplierId}
          className={"mx-2"}
          getOptionDisabled={(option) =>
            Formik?.values?.stockProducts?.some(
              (r) => r.productId === option?._id
            )
          }
          onChange={(event, newValue) => {
            const updatedStockProducts = [...Formik.values.stockProducts];
            const updatedProduct = {
              ...updatedStockProducts[i],
              productId: newValue?._id,
              transId: Formik.values.transId,
              buyPrice: newValue?.buyPrice,
              sellPrice: newValue?.sellPrice,
              quantities: [],
            };
            updatedStockProducts[i] = updatedProduct;
            Formik.setFieldValue("stockProducts", updatedStockProducts);
          }}
          size={"small"}
          sx={{ width: 200 }}
          options={products}
          globalLabel={"productName"}
          imgType={"products"}
          imgSrc={"standardImage"}
          label={"Select Product"}
        />
      </TableCell>
      <TableCell align="center">
        <div className="avatar">
          <div className="w-8 rounded">
            <img
              src={
                product ? `${product?.standardImage}` : "/common/no_image.png"
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
                product.productName.replaceAll(" ", "_") +
                  "." +
                  event.target.files[0].name.split(".")[1],
                {
                  type: event.target.files[0].type,
                }
              );
              handleUploadImage(fileWithCustomName)
                .then((res) => res.json())
                .then((imgData) => {
                  console.log(imgData);
                  setFlaw1img(URL.createObjectURL(event.target.files[0]));

                  const updatedStockProducts = [...Formik.values.stockProducts];
                  const updatedProduct = {
                    ...updatedStockProducts[i],
                    flaw1: imgData?.data?.url,
                    flaw1_delete_url: imgData?.data?.delete_url,
                  };
                  updatedStockProducts[i] = updatedProduct;
                  Formik.setFieldValue("stockProducts", updatedStockProducts);
                });
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
              const blob = new Blob([event.target.files[0]], {
                type: event.target.files[0].type,
              });
              const fileWithCustomName = new File(
                [blob],
                product.productName.replaceAll(" ", "_") +
                  "." +
                  event.target.files[0].name.split(".")[1],
                {
                  type: event.target.files[0].type,
                }
              );
              handleUploadImage(fileWithCustomName)
                .then((res) => res.json())
                .then((imgData) => {
                  setFlaw2img(URL.createObjectURL(event.target.files[0]));
                  const updatedStockProducts = [...Formik.values.stockProducts];
                  const updatedProduct = {
                    ...updatedStockProducts[i],
                    flaw2: imgData?.data?.url,
                    flaw2_delete_url: imgData?.data?.delete_url,
                  };
                  updatedStockProducts[i] = updatedProduct;
                  Formik.setFieldValue("stockProducts", updatedStockProducts);
                });
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
                product.productName.replaceAll(" ", "_") +
                  "." +
                  event.target.files[0].name.split(".")[1],
                {
                  type: event.target.files[0].type,
                }
              );

              handleUploadImage(fileWithCustomName)
                .then((res) => res.json())
                .then((imgData) => {
                  setFlaw3img(URL.createObjectURL(event.target.files[0]));
                  const updatedStockProducts = [...Formik.values.stockProducts];
                  const updatedProduct = {
                    ...updatedStockProducts[i],
                    flaw3: imgData?.data?.url,
                    flaw3_delete_url: imgData?.data?.delete_url,
                  };
                  updatedStockProducts[i] = updatedProduct;
                  Formik.setFieldValue("stockProducts", updatedStockProducts);
                });
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
          onClick={(event) => (event.target.value = "")}
          onChange={(event) => {
            const updatedStockProducts = [...Formik.values.stockProducts];
            const updatedProduct = {
              ...updatedStockProducts[i],
              buyPrice: event.target.value,
            };
            updatedStockProducts[i] = updatedProduct;
            Formik.setFieldValue("stockProducts", updatedStockProducts);
          }}
          disabled={!product}
          value={Formik.values.stockProducts[i]?.buyPrice || 0}
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          onClick={(event) => (event.target.value = "")}
          onChange={(event) => {
            const updatedStockProducts = [...Formik.values.stockProducts];
            const updatedProduct = {
              ...updatedStockProducts[i],
              sellPrice: event.target.value,
            };
            updatedStockProducts[i] = updatedProduct;
            Formik.setFieldValue("stockProducts", updatedStockProducts);
          }}
          disabled={!product}
          value={Formik.values.stockProducts[i]?.sellPrice || 0}
          size="small"
        />
      </TableCell>
      <TableCell size="small" align="center">
        <QuantityInDrawer i={i} product={product} disabled={!product} />
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => {
            const updatedStockProducts = [...Formik.values.stockProducts];

            updatedStockProducts[i] = "";

            Formik.setFieldValue("stockProducts", updatedStockProducts);
            productRefetch();
          }}
          size="small"
          className="bg-info text-primary"
        >
          <RestartAlt />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default StockInTableRow;
