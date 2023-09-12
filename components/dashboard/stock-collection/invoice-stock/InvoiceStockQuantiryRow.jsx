import useGetQsByProductIdSizeId from "@/hooks/useGetQsByProductIdSizeId";
import React from "react";
import SizeDetailsDrawer from "../../dashboard-sizes/SizeDetailsDrawer";
import useGetQsByInvoiceIdProductIdSizeId from "@/hooks/useGetQsByInvoiceIdProductIdSizeId";
import { IconButton } from "@mui/material";
import { Edit, Done, Delete } from "@mui/icons-material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import useGetAllInvoices from "@/hooks/useGetAllInvoices";
import useGetPsByInvoiceId from "@/hooks/useGetPsByInvoiceId";

const InvoiceStockQuantiryRow = ({
  size,
  product,
  sp,
  editingQuantity,
  setEditingQuantity,
}) => {
  const { sizeName, _id, sizeAttributes } = size;

  const { qp_invoice_product_size, qp_invoice_product_size_refetch } =
    useGetQsByInvoiceIdProductIdSizeId(sp?.invoiceId, sp?.productId, _id);
  const { invoicesRefetch } = useGetAllInvoices();
  const { sps_invoice_refetch } = useGetPsByInvoiceId(sp?.invoiceId);

  const Formik = useFormik({
    initialValues: {
      quantity: qp_invoice_product_size?.quantity || 0,
    },
    onSubmit: (values) => {
      console.log(values);

      fetch(
        `/api/edit-qs?invoiceId=${sp?.invoiceId}&productId=${sp?.productId}&sizeId=${_id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            qp_invoice_product_size_refetch();
            invoicesRefetch();
            sps_invoice_refetch();
            setEditingQuantity("");
            toast.success("Quantity Modified successfully");
          }
        });
    },
  });

  return (
    <tr>
      <th>{_id}</th>
      <td>{sizeName}</td>
      <td>
        {qp_invoice_product_size?.quantity > 0 ? (
          <input
            onClick={(event) => (event.target.value = "")}
            disabled={editingQuantity !== _id}
            type="text"
            className="input input-border input-sm"
            name="quantity"
            {...Formik.getFieldProps("quantity")}
          />
        ) : (
          <input
            onClick={(event) => (event.target.value = "")}
            disabled={editingQuantity !== _id}
            type="text"
            className="input input-border input-sm"
            name="quantity"
            onChange={(event) =>
              Formik.setFieldValue("quantity", event.target.value)
            }
            value={Formik.values.quantity || 0}
          />
        )}
      </td>
      <td>
        <SizeDetailsDrawer
          sizeAttributes={sizeAttributes}
          sizeName={sizeName}
          categoryId={product?.categoryId}
          sizeId={_id}
        />
      </td>
      <td>
        {editingQuantity === _id ? (
          <IconButton
            onClick={Formik.handleSubmit}
            className="bg-[green] text-white hover:bg-green-400"
          >
            <Done />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setEditingQuantity(_id)}
            className="bg-[darkblue] text-white hover:bg-blue-400"
          >
            <Edit />
          </IconButton>
        )}
      </td>
      <td>
        <IconButton className="bg-[red] text-white hover:bg-red-500">
          <Delete />
        </IconButton>
      </td>
    </tr>
  );
};

export default InvoiceStockQuantiryRow;
