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
import StockCollection from "@/layouts/StockCollection";
import InvoiceStockRow from "@/components/dashboard/stock-collection/invoice-stock/InvoiceStockRow";
import useGetAllInvoices from "@/hooks/useGetAllInvoices";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function InvoiceStock() {
  const { invoices } = useGetAllInvoices();

  return (
    <StockCollection>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="font-bold text-white">
                Invoice Id & Date
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Supplier Info
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Trans Id
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Net Buy Price
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Net Sell Price
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Net Profit
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Avg Buy Price
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Avg Sell Price
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Avg Profit
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Edit
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.map((invoice) => (
              <InvoiceStockRow invoice={invoice} key={invoice?._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StockCollection>
  );
}
