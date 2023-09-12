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
} from "@mui/material";
import StockCollection from "@/layouts/StockCollection";
import InvoiceStockRow from "@/components/dashboard/stock-collection/invoice-stock/InvoiceStockRow";
import useGetAllInvoices from "@/hooks/useGetAllInvoices";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "@/components/common_dlt_confirmation-dialog";

export default function InvoiceStock() {
  const { invoices, invoicesRefetch } = useGetAllInvoices();
  const [editingInvoice, setEditingInvoice] = React.useState();
  const tableContainerRef = React.useRef();
  const [deletingInvoice, setDeletingInvoice] = React.useState(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const handleDeleteInvoice = () => {
    fetch(`/api/delete-invoice?invoiceId=${deletingInvoice?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          invoicesRefetch();
          toast.success("Invoice deleted successfully");
          setDeletingInvoice(null);
          setDeleteOpen(false);
        }
      });
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft += 100; // Adjust the scrolling distance as needed
    }
  };

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft -= 100; // Adjust the scrolling distance as needed
    }
  };

  return (
    <StockCollection>
      <IconButton onClick={scrollLeft}>
        <ArrowLeft />
      </IconButton>
      <IconButton onClick={scrollRight}>
        <ArrowRight />
      </IconButton>
      <TableContainer
        sx={{ overflowX: "hidden" }}
        ref={tableContainerRef}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="font-bold text-white flex justify-evenly sticky left-0 bg-[darkblue] z-auto">
                <span>Invoice Date & Id</span> <span>Supplier Info</span>
              </TableCell>
              <TableCell className="font-bold text-white" align="center">
                Trans Id
              </TableCell>
              <TableCell className="font-bold text-white" align="center">
                Net Buy Price
              </TableCell>
              <TableCell className="font-bold text-white" align="center">
                Net Sell Price
              </TableCell>
              <TableCell className="font-bold text-white" align="center">
                Net Profit
              </TableCell>
              <TableCell className="font-bold text-white" align="center">
                Avg Buy Price
              </TableCell>
              <TableCell className="font-bold text-white" align="center">
                Avg Sell Price
              </TableCell>
              <TableCell className="font-bold text-white" align="center">
                Avg Profit
              </TableCell>
              <TableCell className="font-bold text-white" align="center">
                Products
              </TableCell>
              <TableCell className="font-bold text-white flex justify-evenly sticky right-0 bg-[darkblue] z-auto">
                <span>Edit</span> <span>Delete</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.map((invoice) => (
              <InvoiceStockRow
                editingInvoice={editingInvoice}
                setEditingInvoice={setEditingInvoice}
                setDeletingInvoice={setDeletingInvoice}
                setDeleteOpen={setDeleteOpen}
                invoice={invoice}
                key={invoice?._id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deletingInvoice && (
        <DeleteConfirmationDialog
          confirmMessage={
            "Are you sure to delete this Invoice ? All the products and quantity of this invoice would be removed."
          }
          confirmTitle={"Confirmation for deleting the Invoice."}
          actionFunction={handleDeleteInvoice}
          open={isDeleteOpen}
          setOpen={setDeleteOpen}
        />
      )}
    </StockCollection>
  );
}
