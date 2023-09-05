import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import StockInTableRow from "./StockInTableRow";

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

const ProductsIn = ({ records, setRecords }) => {
  return (
    <div className="mb-10">
      <p className="text-2xl font-bold text-start mb-5">Invoice Products</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="text-white font-bold" align="center">
                #
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Select Product
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Image
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Flaw Images
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Buy Price
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Sell Price
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Quantity
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Reset
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records?.map((record, i) => (
              <StockInTableRow
                records={records}
                setRecords={setRecords}
                record={record}
                key={i}
                i={i}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductsIn;
