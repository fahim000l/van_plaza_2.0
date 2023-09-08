import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import useGetPsByProductId from "@/hooks/useGetPsByProductId";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import ProductStockQuantiryDrawer from "./ProductStockQuantiryDrawer";
import ProductStockInvoiceDrawer from "./ProductStockInvoiceDrawer";
import ProductStockFlawsDrawer from "./ProductStockFlawsDrawer";
import { Delete } from "@mui/icons-material";

const ProductsStockRow = ({ product }) => {
  const { sps_product } = useGetPsByProductId(product?._id);
  const { products } = useGetAllProducts();

  const { category } = useGetCategoryById(product?.categoryId);

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
      );
    };

    const { productName, standardImage } = product;

    return (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          <div className="flex items-center w-40">
            <div className="avatar mx-2">
              <div className="w-8 rounded">
                <img src={`/uploads/images/products/${standardImage}`} />
              </div>
            </div>
            {productName}
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="w-32">{category?.categoryName}</div>
        </TableCell>
        <TableCell align="center">
          <div className="w-32">{netPrice("buyPrice")}</div>
        </TableCell>
        <TableCell align="center">
          <div className="w-32">{netPrice("sellPrice")}</div>
        </TableCell>
        <TableCell align="center">
          <div className="w-32">
            {netPrice("sellPrice") - netPrice("buyPrice")}
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="w-32">{avgPrice("buyPrice")}</div>
        </TableCell>
        <TableCell align="center">
          <div className="w-32">{avgPrice("sellPrice")}</div>
        </TableCell>
        <TableCell align="center">
          <div className="w-32">
            {avgPrice("sellPrice") - avgPrice("buyPrice")}
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
