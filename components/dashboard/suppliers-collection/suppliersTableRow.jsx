import React from "react";
import { TableRow, TableCell, TextField, IconButton } from "@mui/material";
import { Done, Edit, Delete } from "@mui/icons-material";
import { useFormik } from "formik";
import useGetAllSuppliers from "@/hooks/useGetAllSuppliers";
import { toast } from "react-hot-toast";

const SuppliersTableRow = ({
  supplier,
  editingSupplier,
  setEditingSupplier,
  setDeletingSupplier,
  setDeleteOpen,
}) => {
  const { supplierName, contactInfo, _id } = supplier;
  const { suppliersRefetch } = useGetAllSuppliers();

  const Formik = useFormik({
    initialValues: {
      supplierName: supplierName,
      contactInfo: contactInfo,
    },
    onSubmit: (values) => {
      fetch(`/api/edit-supplier?supplierId=${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.modifiedCount > 0) {
            suppliersRefetch();
            setEditingSupplier("");
            toast.success(`Supplier Id : ${_id} modified successfully`);
          }
        });
    },
  });

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">{_id}</TableCell>
      <TableCell align="center">
        <TextField
          disabled={editingSupplier !== _id}
          {...Formik.getFieldProps("supplierName")}
          name="supplierName"
          size="small"
          variant="filled"
          defaultValue={supplierName}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          disabled={editingSupplier !== _id}
          {...Formik.getFieldProps("contactInfo")}
          name="contactInfo"
          size="small"
          variant="filled"
          defaultValue={contactInfo}
        />
      </TableCell>
      <TableCell align="center">
        {editingSupplier === _id ? (
          <IconButton
            onClick={Formik.handleSubmit}
            className="bg-[green] text-white hover:bg-green-400"
          >
            <Done />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setEditingSupplier(_id)}
            className="bg-[darkblue] text-white hover:bg-blue-400"
          >
            <Edit />
          </IconButton>
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => {
            setDeletingSupplier(supplier);
            setDeleteOpen(true);
          }}
          className="bg-[red] text-white hover:bg-red-500"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default SuppliersTableRow;
