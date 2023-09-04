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
import useGetAllCategories from "@/hooks/useGetAllCategories";
import { Edit, Delete, Done } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import DeleteConfirmationDialog from "@/components/common_dlt_confirmation-dialog";
import CategoriesTableRow from "@/components/dashboard/dashboard-categories/CategoriesTableRow";
import AddCategoryDrawer from "@/components/dashboard/dashboard-categories/add_category-drawer";

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
              <CategoriesTableRow
                key={category?._id}
                category={category}
                error={error}
                editingCategory={editingCategory}
                setEditingCategory={setEditingCategory}
                setDeleteOpen={setDeleteOpen}
                handleEditCategory={handleEditCategory}
                setDeletingCategory={setDeletingCategory}
                setEditingName={setEditingName}
              />
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
