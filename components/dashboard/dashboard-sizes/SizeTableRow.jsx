import React from "react";
import {
  TableRow,
  TableCell,
  TextField,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import { Autocomplete } from "@mui/lab";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import { Info, Done, Edit, Delete } from "@mui/icons-material";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import useGetAllSizes from "@/hooks/useGetAllSizes";
import SizeDetailsDrawer from "./SizeDetailsDrawer";

const SizeTableRow = ({ size, editingSize, setEditingSize }) => {
  const { sizeName, categoryId, sizeAttributes, _id } = size;

  const { categories } = useGetAllCategories();
  const { category } = useGetCategoryById(categoryId);
  const { sizesRefetch } = useGetAllSizes();

  const Formik = useFormik({
    initialValues: {
      sizeName: sizeName,
      categoryId: categoryId,
    },
    onSubmit: (values) => {
      console.log(values);

      fetch(`/api/edit-size?sizeId=${_id}`, {
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
            toast.success(`Size Id : ${_id} modified successfully`);
            setEditingSize("");
            sizesRefetch();
          }
        });
    },
  });

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell className="flex flex-col" align="center">
        <TextField
          disabled={editingSize !== _id}
          name="sizeName"
          size="small"
          {...Formik.getFieldProps("sizeName")}
          defaultValue={sizeName}
        />
        <Chip className="mt-2" label={_id} />
      </TableCell>
      <TableCell align="center">
        {category && (
          <Autocomplete
            disabled={editingSize !== _id}
            size="small"
            id="country-select-demo"
            sx={{ width: 200 }}
            options={categories}
            defaultValue={category}
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
        )}
      </TableCell>
      <TableCell align="center">
        <SizeDetailsDrawer
          sizeName={sizeName}
          categoryId={categoryId}
          sizeAttributes={sizeAttributes}
        />
      </TableCell>
      <TableCell align="center">
        {editingSize === _id ? (
          <IconButton
            onClick={Formik.handleSubmit}
            className="bg-[green] text-white hover:bg-green-400"
          >
            <Done />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setEditingSize(_id)}
            className="bg-[darkblue] text-white hover:bg-blue-400"
          >
            <Edit />
          </IconButton>
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => {
            setDeleteOpen(true);
            setDeletingCategory(category);
          }}
          className="bg-[red] text-white hover:bg-red-500"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default SizeTableRow;
