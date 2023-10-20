import React, { useEffect } from "react";
import {
  TableRow,
  TableCell,
  Avatar,
  TextField,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import { Autocomplete } from "@mui/lab";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import { Done, Edit, Delete } from "@mui/icons-material";
import { useFormik } from "formik";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import { toast } from "react-hot-toast";

const ProductsTableRow = ({
  product,
  editingProduct,
  setEditingProduct,
  setDeletingProduct,
  setDeleteOpen,
}) => {
  const { categories } = useGetAllCategories();
  const { productsRefetch } = useGetAllProducts();

  const Formik = useFormik({
    initialValues: {
      productName: product?.productName,
      buyPrice: product?.buyPrice,
      sellPrice: product?.sellPrice,
      categoryId: product?.category[0]?._id,
    },
    onSubmit: (values) => {
      console.log(values);
      fetch(`/api/edit-product?productId=${product?._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.modifiedCount > 0) {
            productsRefetch();
            setEditingProduct(null);
            toast.success(`Product Id : ${product?._id} modified successfully`);
          }
        });
    },
  });

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Avatar src={product?.standardImage} />
      </TableCell>
      <TableCell align="left">
        <TextField
          disabled={editingProduct !== product?._id}
          name="productName"
          fullWidth
          {...Formik.getFieldProps("productName")}
          size="small"
          defaultValue={product?.productName?.split("-")[0]}
        />
        <Chip className="mt-2" label={product?._id} />
      </TableCell>
      <TableCell align="center">
        <Autocomplete
          disabled={editingProduct !== product?._id}
          size="small"
          id="country-select-demo"
          sx={{ width: 200 }}
          options={categories}
          defaultValue={product?.category[0]}
          onChange={(event, newValue) =>
            Formik.setFieldValue("categoryId", newValue?._id)
          }
          autoHighlight
          getOptionLabel={(option) => option.categoryName}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`/uploads/images/categories/${option?.categoryImage}`}
                alt=""
              />
              {option.categoryName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              name="category"
              onChange={() => setSelectedCategory(params)}
              fullWidth
              {...params}
              className="bg-white my-2"
              label="Select Category"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          disabled={editingProduct !== product?._id}
          size="small"
          name="buyPrice"
          {...Formik.getFieldProps("buyPrice")}
          defaultValue={product?.buyPrice}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          disabled={editingProduct !== product?._id}
          size="small"
          name="sellPrice"
          {...Formik.getFieldProps("sellPrice")}
          defaultValue={product?.sellPrice}
        />
      </TableCell>
      <TableCell align="center">
        {editingProduct === product?._id ? (
          <IconButton
            onClick={Formik.handleSubmit}
            className="bg-[green] text-white hover:bg-green-400"
          >
            <Done />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setEditingProduct(product?._id)}
            className="bg-[darkblue] text-white hover:bg-blue-400"
          >
            <Edit />
          </IconButton>
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => {
            setDeletingProduct(product);
            setDeleteOpen(true);
          }}
          className="bg-[red] text-white hover:bg-red-500"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductsTableRow;
