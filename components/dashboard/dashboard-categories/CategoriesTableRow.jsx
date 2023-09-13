import React from "react";
import {
  TableRow,
  TableCell,
  Avatar,
  IconButton,
  TextField,
} from "@mui/material";
import { Done, Edit, Delete } from "@mui/icons-material";

const CategoriesTableRow = ({
  category,
  error,
  editingCategory,
  setEditingCategory,
  setDeleteOpen,
  handleEditCategory,
  setEditingName,
  setDeletingCategory,
}) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Avatar
          alt="Remy Sharp"
          src={category?.categoryImage}
          sx={{ width: 56, height: 56 }}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          error={error && editingCategory === category?._id ? true : false}
          helperText={error}
          onChange={(event) => setEditingName(event.target.value)}
          size="small"
          defaultValue={category?.categoryName}
          disabled={editingCategory != category?._id}
        />
      </TableCell>
      <TableCell align="center">{category?._id}</TableCell>
      <TableCell align="center">{0}</TableCell>
      <TableCell align="center">
        {editingCategory === category?._id ? (
          <IconButton
            onClick={handleEditCategory}
            className="bg-[green] text-white hover:bg-green-400"
          >
            <Done />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setEditingCategory(category?._id)}
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

export default CategoriesTableRow;
