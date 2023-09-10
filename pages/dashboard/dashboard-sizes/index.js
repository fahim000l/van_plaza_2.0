import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dashboard from "@/layouts/Dashboard";
import AddSizeDrawer from "@/components/dashboard/dashboard-sizes/AddSizeDrawer";
import useGetAllSizes from "@/hooks/useGetAllSizes";
import SizeTableRow from "@/components/dashboard/dashboard-sizes/SizeTableRow";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import DeleteConfirmationDialog from "@/components/common_dlt_confirmation-dialog";
import { toast } from "react-hot-toast";

export default function DashboardSizes() {
  const { sizes, sizesRefetch } = useGetAllSizes();
  const [editingSize, setEditingSize] = React.useState("");
  const [deletingSize, setDeletingSize] = React.useState(null);
  const [isdeleteOpen, setDeleteOpen] = React.useState(false);

  const { category } = useGetCategoryById(deletingSize?.categoryId);

  const handleDeleteSize = () => {
    fetch(`/api/delete-size?sizeId=${deletingSize?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          sizesRefetch();
          setDeleteOpen(false);
          toast.success(`Size id ${deletingSize?._id} deleted successfully`);
          setDeletingSize(null);
        }
      });
  };

  return (
    <Dashboard>
      <div>
        <AddSizeDrawer />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="text-white font-bold" align="center">
                Size
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Category
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Details
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
            {sizes?.map((size) => (
              <SizeTableRow
                key={size?._id}
                size={size}
                editingSize={editingSize}
                setEditingSize={setEditingSize}
                setDeletingSize={setDeletingSize}
                setDeleteOpen={setDeleteOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deletingSize && category && (
        <DeleteConfirmationDialog
          open={isdeleteOpen}
          setOpen={setDeleteOpen}
          actionFunction={handleDeleteSize}
          confirmTitle={`Confirmation to delete Size : ${deletingSize?.sizeName} of Category : ${category?.categoryName}`}
          confirmMessage={"Are you sure to delete this Size ?"}
        />
      )}
    </Dashboard>
  );
}
