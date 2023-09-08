import React from "react";
import { TableRow, TableCell, TextField } from "@mui/material";
import useGetPsByProductId from "@/hooks/useGetPsByProductId";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import AutoSelect from "@/components/common_auto-complete";
import useGetAllProducts from "@/hooks/useGetAllProducts";

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
      return sps_product?.reduce((total, newValue) => {
        return (total + parseFloat(newValue[priceTitle])) / total;
      }, 0);
    };

    const { standardImage } = product;

    console.log(product);
    console.log(sps_product);
    return (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          <div className="flex items-center">
            <div className="avatar mx-1">
              <div className="w-8 rounded">
                <img src={`/uploads/images/products/${standardImage}`} />
              </div>
            </div>
            <AutoSelect
              sx={{ width: 200 }}
              value={product}
              imgSrc={"standardImage"}
              imgType={"products"}
              globalLabel={"productName"}
              options={products}
            />
          </div>
        </TableCell>
        <TableCell align="center">{category?.categoryName}</TableCell>
        <TableCell align="center">
          <TextField
            className="w-20"
            size="small"
            value={netPrice("buyPrice")}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            className="w-20"
            size="small"
            value={netPrice("sellPrice")}
          />
        </TableCell>
        <TableCell align="center">
          {netPrice("sellPrice") - netPrice("buyPrice")}
        </TableCell>
        <TableCell align="center">stomethong</TableCell>
        <TableCell align="center">stomethong</TableCell>
        <TableCell align="center">stomethong</TableCell>
        <TableCell align="center">stomethong</TableCell>
        <TableCell align="center">stomethong</TableCell>
        <TableCell align="center">stomethong</TableCell>
        <TableCell align="center">stomethong</TableCell>
        <TableCell align="center">stomethong</TableCell>
      </TableRow>
    );
  }
};

export default ProductsStockRow;
