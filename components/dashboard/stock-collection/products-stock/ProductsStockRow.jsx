import React from "react";
import { TableRow, TableCell, Chip } from "@mui/material";
import useGetPsByProductId from "@/hooks/useGetPsByProductId";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import ProductStockQuantiryDrawer from "./ProductStockQuantiryDrawer";
import ProductStockInvoiceDrawer from "./ProductStockInvoiceDrawer";
import useGetQsByProductId from "@/hooks/useGetQsByProductId";

const ProductsStockRow = ({ product }) => {
  const { sps_product, category, qps_product } = product;

  if (sps_product?.length > 0) {
    const netPrice = (priceTitle) => {
      return sps_product?.reduce((total, newValue) => {
        return total + parseFloat(newValue[priceTitle]);
      }, 0);
    };

    const avgPrice = (priceTitle) => {
      return (
        sps_product?.reduce((total, newValue) => {
          return total + parseFloat(newValue[priceTitle]);
        }, 0) / sps_product?.length
      ).toFixed(2);
    };

    const totalQuantity = () => {
      return qps_product?.reduce((total, newValue) => {
        return total + parseInt(newValue?.quantity);
      }, 0);
    };

    const { productName, standardImage } = product;

    return (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell
          component="th"
          scope="row"
          className="sticky left-0 bg-white"
        >
          <div className="flex items-center w-40 b-r-2 border-[blue] border-solid">
            <div className="avatar mx-2">
              <div className="w-8 rounded">
                <img src={standardImage} />
              </div>
            </div>
            {productName?.split("-")[0]}
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="w-full">{category[0]?.categoryName}</div>
        </TableCell>
        <TableCell align="center">
          <div className="w-full">
            <Chip className="my-1" label={`Single : ${netPrice("buyPrice")}`} />
            <Chip
              className="my-1"
              label={`Each : ${(netPrice("buyPrice") * totalQuantity()).toFixed(
                3
              )}`}
            />
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="w-full">
            <Chip className="my-1" label={`Single : ${netPrice("buyPrice")}`} />
            <Chip
              className="my-1"
              label={`Each : ${(
                netPrice("sellPrice") * totalQuantity()
              ).toFixed(2)}`}
            />
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="w-full">
            <Chip
              className="my-1"
              label={`Single : ${netPrice("sellPrice") - netPrice("buyPrice")}`}
            />
            <Chip
              className="my-1"
              label={`Each : ${
                (netPrice("sellPrice") - netPrice("buyPrice")) * totalQuantity()
              }`}
            />
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="w-full">
            <Chip className="my-1" label={`Single : ${avgPrice("buyPrice")}`} />
            <Chip
              className="my-1"
              label={`Each : ${avgPrice("buyPrice") * totalQuantity()}`}
            />
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="w-full">
            <Chip
              className="my-1"
              label={`Single : ${avgPrice("sellPrice")}`}
            />
            <Chip
              className="my-1"
              label={`Each : ${avgPrice("sellPrice") * totalQuantity()}`}
            />
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="w-full">
            <Chip
              className="my-1"
              label={`Single : ${(
                avgPrice("sellPrice") - avgPrice("buyPrice")
              ).toFixed(2)}`}
            />
            <Chip
              className="my-1"
              label={`Each : ${
                (avgPrice("sellPrice") - avgPrice("buyPrice")).toFixed(2) *
                totalQuantity()
              }`}
            />
          </div>
        </TableCell>
        <TableCell align="center">
          <ProductStockQuantiryDrawer product={product} />
        </TableCell>
        <TableCell align="center">
          <ProductStockInvoiceDrawer product={product} />
        </TableCell>
      </TableRow>
    );
  }
};

export default ProductsStockRow;
