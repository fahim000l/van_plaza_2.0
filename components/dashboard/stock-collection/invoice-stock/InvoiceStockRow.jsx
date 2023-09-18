import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import InvoiceStockProductsDrawer from "./InvoiceStockProductsDrawer";

const InvoiceStockRow = ({
  invoice,
  editingInvoice,
  setEditingInvoice,
  setDeletingInvoice,
  setDeleteOpen,
}) => {
  const { _id, supplierId, date, transId, sps_invoice, qps_invoice } = invoice;
  const { invoicesRefetch } = useGetAllInvoices();

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
            toast.success(`Invoice Id : ${_id} modified successfully`);
          }
        });
    },
  });

  const { suppliers } = useGetAllSuppliers();
  const { supplier } = invoice;

  const totalPrice = (priceTitle) => {
    return sps_invoice?.reduce((total, newValue) => {
      return total + parseFloat(newValue[priceTitle]).toFixed(2);
    }, 0);
  };

  const avgPrice = (priceTitle) => {
    return (
      sps_invoice?.reduce((total, newValue) => {
        return total + parseFloat(newValue[priceTitle]);
      }, 0) / sps_invoice?.length
    ).toFixed(2);
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
                // value={supplier?.[0]}
              />
              <Chip label={supplier?.[0]?.contactInfo} className="my-1" />
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
            label={`Single : ${parseFloat(totalPrice("buyPrice")).toFixed(2)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              parseFloat(totalPrice("buyPrice")).toFixed(2) *
              parseInt(totalQuantity())
            ).toFixed(2)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        {" "}
        <div>
          <Chip
            className="my-1"
            label={`Single : ${parseFloat(totalPrice("sellPrice")).toFixed(2)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              parseFloat(totalPrice("sellPrice")).toFixed(2) *
              parseInt(totalQuantity())
            ).toFixed(2)}`}
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
            ).toFixed(2)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              (parseFloat(totalPrice("sellPrice")) -
                parseFloat(totalPrice("buyPrice"))) *
              totalQuantity()
            ).toFixed(2)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div>
          <Chip
            className="my-1"
            label={`Single : ${parseFloat(avgPrice("buyPrice")).toFixed(2)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              parseFloat(avgPrice("buyPrice")).toFixed(2) *
              parseInt(totalQuantity())
            ).toFixed(2)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div>
          <Chip
            className="my-1"
            label={`Single : ${parseFloat(avgPrice("sellPrice")).toFixed(2)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              parseFloat(avgPrice("sellPrice")).toFixed(2) *
              parseInt(totalQuantity())
            ).toFixed(2)}`}
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
            ).toFixed(2)}`}
          />
          <Chip
            className="my-1"
            label={`Each : ${(
              (parseFloat(avgPrice("sellPrice")) -
                parseFloat(avgPrice("buyPrice"))) *
              totalQuantity()
            ).toFixed(2)}`}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <InvoiceStockProductsDrawer
          qps_invoice={qps_invoice}
          sps_invoice={sps_invoice}
        />
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
            <IconButton
              onClick={() => {
                setDeletingInvoice(invoice);
                setDeleteOpen(true);
              }}
              className="bg-[red] text-white hover:bg-red-500"
            >
              <Delete />
            </IconButton>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceStockRow;
