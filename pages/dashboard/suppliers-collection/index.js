import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Dashboard from "@/layouts/Dashboard";
import AddSupplierModal from "@/components/dashboard/suppliers-collection/AddSupplierModal";
import useGetAllSuppliers from "@/hooks/useGetAllSuppliers";
import SuppliersTableRow from "@/components/dashboard/suppliers-collection/suppliersTableRow";
import DeleteConfirmationDialog from "@/components/common_dlt_confirmation-dialog";
import { toast } from "react-hot-toast";

export default function SuppliersCollection() {
  const AddSupplierModalLabel = React.useRef();
  const { suppliers, suppliersRefetch } = useGetAllSuppliers();
  const [editingSupplier, setEditingSupplier] = React.useState("");
  const [deletingSupplier, setDeletingSupplier] = React.useState(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const handleDeleteSupplier = () => {
    fetch(`/api/delete-supplier?supplierId=${deletingSupplier?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          suppliersRefetch();
          toast.success(
            `Supplier Id : ${deletingSupplier?._id} deleted successfully`
          );
          setDeleteOpen(false);
          setDeletingSupplier(null);
        }
      });
  };

  return (
    <Dashboard>
      <label
        ref={AddSupplierModalLabel}
        htmlFor="AddSupplierModal"
        className="hidden"
      >
        AddSupplierModalLabel
      </label>
      <Button
        onClick={() => AddSupplierModalLabel.current.click()}
        variant="contained"
        className="bg-[darkblue] my-5"
      >
        Add New Supplier
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="text-white font-bold" align="center">
                Supplier Id
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Supplier Name
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Contact Info
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
            {suppliers?.map((supplier) => (
              <SuppliersTableRow
                key={supplier?._id}
                supplier={supplier}
                editingSupplier={editingSupplier}
                setEditingSupplier={setEditingSupplier}
                setDeletingSupplier={setDeletingSupplier}
                setDeleteOpen={setDeleteOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddSupplierModal />
      {deletingSupplier && (
        <DeleteConfirmationDialog
          open={isDeleteOpen}
          setOpen={setDeleteOpen}
          actionFunction={handleDeleteSupplier}
          confirmTitle={`Confirmation to delete supplier : ${deletingSupplier?.supplierName}`}
          confirmMessage={"Are you sure to delete this supplier ?"}
        />
      )}
    </Dashboard>
  );
}
