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
        sx={{ overflowX: "hidden", width: 1050 }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead className="bg-[blue] z-[200]">
            <TableRow>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold bg-[darkblue] z-[300] sticky left-0"
                align="left"
              >
                Product
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Category
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Net Buy Price
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Net Sell Price
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Net Profit
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Avg Buy Price
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Avg Sell Price
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Avg Profit
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{ minWidth: 32 }}
                className="text-white font-bold"
                align="center"
              >
                Invoices
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
