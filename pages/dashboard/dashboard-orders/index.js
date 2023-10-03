import useGetAllOrders from "@/hooks/useGetAllOrders";
import Dashboard from "@/layouts/Dashboard";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OrdersTableRow from "@/components/dashboard-orders/OrdersTableRow";

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

const DashboardOrders = () => {
  const { orders } = useGetAllOrders();

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <Dashboard>
      <div className="tabs tabs-boxed mb-5">
        <a className="tab">All</a>
        <a className="tab">Pending</a>
        <a className="tab">Delevered</a>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="text-white font-bold">User</TableCell>
              <TableCell className="text-white font-bold" align="center">
                Order Date & Id
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                deleveryFee
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                transId
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                location
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Contents
              </TableCell>
              <TableCell className="text-white font-bold" align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <OrdersTableRow key={order?._id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dashboard>
  );
};

export default DashboardOrders;
