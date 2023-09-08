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
import useGetAllProducts from "@/hooks/useGetAllProducts";
import ProductsStockRow from "@/components/dashboard/stock-collection/products-stock/ProductsStockRow";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";

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

export default function productsStock() {
  const { products } = useGetAllProducts();
  const tableContainerRef = React.useRef();

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
        ref={tableContainerRef}
        sx={{ overflowX: "hidden", width: 1020 }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="text-white font-bold" align="left">
                Product
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Category
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Net Buy Price
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Net Sell Price
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Net Profit
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Avg Buy Price
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Avg Sell Price
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Avg Profit
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Quantity
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Invoices
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Flaws
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
              <ProductsStockRow key={product?._id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StockCollection>
  );
}