import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import useGetAllSuppliers from "@/hooks/useGetAllSuppliers";
import AutoSelect from "@/components/common_auto-complete";
import usegetSupplierById from "@/hooks/usegetSupplierById";
import useGetPsByInvoiceId from "@/hooks/useGetPsByInvoiceId";
import useGetQsByInvoiceId from "@/hooks/useGetQsByInvoiceId";
import { Edit, Delete, Done } from "@mui/icons-material";
import { useFormik } from "formik";
import useGetAllInvoices from "@/hooks/useGetAllInvoices";

const InvoiceStockRow = ({ invoice, editingInvoice, setEditingInvoice }) => {
  const { _id, supplierId, date, transId } = invoice;
  const { invoicesRefetch } = useGetAllInvoices();
  const { sps_invoice, sps_invoice_refetch } = useGetPsByInvoiceId(_id);
  const { qps_invoice, qps_invoice_refetch } = useGetQsByInvoiceId(_id);

  const Formik = useFormik({
    initialValues: {
      date,
      supplierId,
      transId,
    },
    onSubmit: (values) => {
      console.log(values);

      fetch(`/api/edit-invoice?invoiceId=${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            setEditingInvoice("");
            invoicesRefetch();
            sps_invoice_refetch();
            qps_invoice_refetch();
          }
        });
    },
  });

  const { suppliers } = useGetAllSuppliers();
  const { supplier } = usegetSupplierById(Formik?.values?.supplierId);

  const totalPrice = (priceTitle) => {
    return sps_invoice?.reduce((total, newValue) => {
      return total + parseFloat(newValue[priceTitle]).toFixed(3);
    }, 0);
  };

  const avgPrice = (priceTitle) => {
    return (
      sps_invoice?.reduce((total, newValue) => {
        return total + parseFloat(newValue[priceTitle]);
      }, 0) / sps_invoice?.length
    ).toFixed(3);
  };

  const totalQuantity = () => {
    return qps_invoice?.reduce((total, newValue) => {
      return total + parseInt(newValue?.quantity);
    }, 0);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell
        className="sticky left-0 bg-white z-[300] flex justify-between items-center"
        component="th"
        scope="row"
      >
        <div className="full mx-2">
          <TextField
            {...Formik.getFieldProps("date")}
            disabled={editingInvoice !== _id}
            fullWidth
            name="date"
            className="my-1"
            size="small"
            value={Formik?.values?.date}
          />
          <Chip label={_id} className="my-1" />
        </div>
        <div className="mx-2">
          {supplier && (
            <p className="w-full">
              <AutoSelect
                onChange={(event, newValue) =>
                  Formik.setFieldValue("supplierId", newValue?._id)
                }
                disabled={editingInvoice !== _id}
                className={"w-40 my-1"}
                size={"small"}
                options={suppliers}
                globalLabel={"supplierName"}
                value={supplier}
              />
              <Chip label={supplier?.contactInfo} className="my-1" />
            </p>
          )}
        </div>
      </TableCell>
      <TableCell align="center">
        <div className="w-full">
          <TextField
            disabled={editingInvoice !== _id}
            size="small"
            className="my-1 w-52"
            {...Formik.getFieldProps("transId")}
            name="transId"
            value={Formik?.values?.transId}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div>
          <Chip
            className="my-1"
            label={`Single : ${parseFloat(totalPrice("buyPrice")).toFixed(3)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              parseFloat(totalPrice("buyPrice")).toFixed(3) *
              parseInt(totalQuantity())
            ).toFixed(3)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        {" "}
        <div>
          <Chip
            className="my-1"
            label={`Single : ${parseFloat(totalPrice("sellPrice")).toFixed(3)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              parseFloat(totalPrice("sellPrice")).toFixed(3) *
              parseInt(totalQuantity())
            ).toFixed(3)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div>
          <Chip
            className="my-1"
            label={`Single : ${(
              parseFloat(totalPrice("sellPrice")) -
              parseFloat(totalPrice("buyPrice"))
            ).toFixed(3)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              (parseFloat(totalPrice("sellPrice")) -
                parseFloat(totalPrice("buyPrice"))) *
              totalQuantity()
            ).toFixed(3)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div>
          <Chip
            className="my-1"
            label={`Single : ${parseFloat(avgPrice("buyPrice")).toFixed(3)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              parseFloat(avgPrice("buyPrice")).toFixed(3) *
              parseInt(totalQuantity())
            ).toFixed(3)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div>
          <Chip
            className="my-1"
            label={`Single : ${parseFloat(avgPrice("sellPrice")).toFixed(3)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              parseFloat(avgPrice("sellPrice")).toFixed(3) *
              parseInt(totalQuantity())
            ).toFixed(3)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div>
          <Chip
            className="my-1"
            label={`Single : ${(
              parseFloat(avgPrice("sellPrice")) -
              parseFloat(avgPrice("buyPrice"))
            ).toFixed(3)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              (parseFloat(avgPrice("sellPrice")) -
                parseFloat(avgPrice("buyPrice"))) *
              totalQuantity()
            ).toFixed(3)}`}
          />
        </div>
      </TableCell>
      <TableCell className="sticky right-0 bg-white z-[300]" align="center">
        <div className="flex justify-between items-center">
          <div className="mx-2">
            {editingInvoice === _id ? (
              <IconButton
                onClick={Formik?.handleSubmit}
                className="bg-[green] text-white hover:bg-green-400"
              >
                <Done />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setEditingInvoice(_id)}
                className="bg-[darkblue] text-white hover:bg-blue-400"
              >
                <Edit />
              </IconButton>
            )}
          </div>
          <div className="mx-2">
            <IconButton className="bg-[red] text-white hover:bg-red-500">
              <Delete />
            </IconButton>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceStockRow;
