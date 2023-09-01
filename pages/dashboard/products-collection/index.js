import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Dashboard from "@/layouts/Dashboard";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import ProductsTableRow from "@/components/dashboard/products-collection/ProductsTableRow";
import DeleteConfirmationDialog from "@/components/common_dlt_confirmation-dialog";
import { toast } from "react-hot-toast";

export default function ProductsCollection() {
  const { products, productsRefetch } = useGetAllProducts();
  const [editingProduct, setEditingProduct] = React.useState("");
  const [deletingProduct, setDeletingProduct] = React.useState(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const handleDeleteProduct = () => {
    fetch(`/api/delete-product?productId=${deletingProduct?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          productsRefetch();
          toast.success(
            `Product Id : ${deletingProduct?._id} has deleted successfully`
          );
          setDeleteOpen(false);
          setDeletingProduct(null);
        }
      });
  };

  return (
    <Dashboard>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="text-white font-bold">Image</TableCell>
              <TableCell className="text-white font-bold" align="left">
                Product Name
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Category
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Buy Price
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Sell Price
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
            {products?.map((product) => (
              <ProductsTableRow
                key={product?._id}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
                setDeletingProduct={setDeletingProduct}
                setDeleteOpen={setDeleteOpen}
                product={product}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deletingProduct && (
        <DeleteConfirmationDialog
          open={isDeleteOpen}
          setOpen={setDeleteOpen}
          actionFunction={handleDeleteProduct}
          confirmTitle={`Confirmation to delete product : ${deletingProduct?.productName}`}
          confirmMessage={"Are you sure to delete this product ?"}
        />
      )}
    </Dashboard>
  );
}
