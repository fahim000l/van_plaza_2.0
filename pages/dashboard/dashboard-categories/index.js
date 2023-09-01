import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  TextField,
} from "@mui/material";
import Dashboard from "@/layouts/Dashboard";
import AddCategoryDrawer from "@/components/add_category-drawer";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import { Edit, Delete, Done } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import DeleteConfirmationDialog from "@/components/common_dlt_confirmation-dialog";

export default function DashboardCategories() {
  const [editingCategory, setEditingCategory] = React.useState("");
  const [editingName, setEditingName] = React.useState("");
  const [error, setError] = React.useState("");
  const { categories, categoriesRefetch } = useGetAllCategories();
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const [deletingCategory, setDeletingCategory] = React.useState(null);

  const handleEditCategory = () => {
    setError("");
    if (editingName) {
      const editingInfo = {
        categoryId: editingCategory,
        editingName,
      };

      fetch("/api/edit-category", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editingInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.modifiedCount > 0) {
            categoriesRefetch();
            toast.success(
              `Category Id:${editingCategory} updated successfully`
            );
            setEditingCategory("");
            setEditingName("");
          }
        });
    } else {
      setError("Category Name is required");
    }
  };

  const handleDeleteCategory = () => {
    fetch(`/api/delete-category?categoryId=${deletingCategory?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          toast.success(
            `Category Id:${deletingCategory?._id} deleted successfully`
          );
          setDeleteOpen(false);
          categoriesRefetch();
        }
      });
  };

  return (
    <Dashboard>
      <div>
        <AddCategoryDrawer />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "blue" }}>
            <TableRow>
              <TableCell className="text-white font-bold">
                Category Image
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Category Name
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Category Id
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Total Products
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Edit
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow
                key={category?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    alt="Remy Sharp"
                    src={`/uploads/images/categories/${category?.categoryImage}`}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    error={
                      error && editingCategory === category?._id ? true : false
                    }
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deletingCategory && (
        <DeleteConfirmationDialog
          open={isDeleteOpen}
          setOpen={setDeleteOpen}
          actionFunction={handleDeleteCategory}
          confirmTitle={`Confirmation to delete category :${deletingCategory?.categoryName}`}
          confirmMessage={"Are you sure to delete this category ?"}
        />
      )}
    </Dashboard>
  );
}
