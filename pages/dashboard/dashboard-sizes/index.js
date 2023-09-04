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

export default function DashboardSizes() {
  const { sizes } = useGetAllSizes();
  const [editingSize, setEditingSize] = React.useState("");

  return (
    <Dashboard>
      <div>
        <AddSizeDrawer />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[blue]">
            <TableRow>
              <TableCell className="text-white font-blue" align="center">
                Size
              </TableCell>
              <TableCell className="text-white font-blue" align="center">
                Category
              </TableCell>
              <TableCell className="text-white font-blue" align="center">
                Details
              </TableCell>
              <TableCell className="text-white font-blue" align="center">
                Edit
              </TableCell>
              <TableCell className="text-white font-blue" align="center">
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
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dashboard>
  );
}
