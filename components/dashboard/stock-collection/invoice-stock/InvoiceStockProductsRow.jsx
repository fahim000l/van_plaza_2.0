import AutoSelect from "@/components/common_auto-complete";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetProductById from "@/hooks/useGetProductById";
import React, { useState } from "react";
import { Chip } from "@mui/material";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import useGetQsByProductIdInvoiceId from "@/hooks/useGetQsByProductIdInvoiceId";
import useGetPsByInvoiceId from "@/hooks/useGetPsByInvoiceId";
import { Edit, Delete, Done } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import InvoiceStockQuantityDrawer from "./InvoiceStockQuantityDrawer";
import toast from "react-hot-toast";
import useGetAllInvoices from "@/hooks/useGetAllInvoices";

const InvoiceStockProductsRow = ({
  sp,
  i,
  editindProduct,
  setEditingProduct,
  setDeletingProduct,
  setDeleteOpen,
  sps_invoice,
  qps_invoice,
}) => {
  const { _id, productId, transId, buyPrice, sellPrice, invoiceId } = sp;
  const { invoicesRefetch } = useGetAllInvoices();

  const Formik = useFormik({
    initialValues: {
      productId,
      buyPrice,
      sellPrice,
    },
    onSubmit: (values) => {
      console.log(values);

      fetch(`/api/edit-ps?invoiceId=${invoiceId}&productId=${productId}`, {
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
            invoicesRefetch();
            setEditingProduct("");
            toast.success(
              `Ps Id : ${_id} of Invoice Id : ${invoiceId} modified successfully`
            );
          }
        });
    },
  });
  const { product } = sp;
  const { products } = useGetAllProducts();

  const qps_product_invoice = qps_invoice?.filter(
    (qp) => qp?.productId === sp?.productId
  );

  const totalQuantity = () => {
    return qps_product_invoice?.reduce((total, newValue) => {
      return total + parseInt(newValue?.quantity);
    }, 0);
  };

  return (
    <tr>
      <th>{i + 1}</th>
      <td className="sticky left-0 bg-white z-[300]">
        {product && products && (
          <div className="flex items-center b-r-2 border-[blue] border-solid">
            <div className="avatar mx-2">
              <div className="w-10 rounded">
                <img src={product?.[0]?.standardImage} />
              </div>
            </div>
            <div>
              <AutoSelect
                onChange={(event, newValue) =>
                  Formik.setFieldValue("productId", newValue?._id)
                }
                disabled={editindProduct !== _id}
                size={"small"}
                className={"w-60 my-1"}
                options={products}
                value={product?.[0]}
                imgType={"products"}
                imgSrc={"standardImage"}
                globalLabel={"productName"}
              />
              <Chip
                className="my-1 w-full"
                label={product?.[0]?.category?.[0]?.categoryName}
              />
            </div>
          </div>
        )}
      </td>
      <td>
        <div>
          <input
            onClick={(event) => (event.target.value = "")}
            disabled={editindProduct !== _id}
            className="input input-sm input-border my-1"
            type="text"
            name="buyPrice"
            {...Formik.getFieldProps("buyPrice")}
            value={Formik?.values?.buyPrice}
          />
          <Chip
            className="my-1 w-full"
            label={`Each : ${parseFloat(
              parseInt(Formik?.values?.buyPrice) * parseInt(totalQuantity())
            ).toFixed(2)}`}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            onClick={(event) => (event.target.value = "")}
            disabled={editindProduct !== _id}
            className="input input-sm input-border my-1"
            type="text"
            name="sellPrice"
            {...Formik?.getFieldProps("sellPrice")}
            value={Formik?.values?.sellPrice}
          />
          <Chip
            className="my-1 w-full"
            label={`Each : ${parseFloat(
              parseInt(Formik?.values?.sellPrice) * parseInt(totalQuantity())
            ).toFixed(2)}`}
          />
        </div>
      </td>
      <td>
        <div>
          <Chip
            className="my-1 w-full"
            label={`Single : ${parseFloat(
              parseFloat(Formik?.values?.sellPrice).toFixed(2) -
                parseFloat(Formik?.values?.buyPrice).toFixed(2)
            ).toFixed(2)}`}
          />
          <Chip
            className="my-1 w-full"
            label={`Each : ${parseFloat(
              (parseFloat(Formik?.values?.sellPrice).toFixed(2) -
                parseFloat(Formik?.values?.buyPrice).toFixed(2)) *
                parseInt(totalQuantity())
            ).toFixed(2)}`}
          />
        </div>
      </td>
      <td>
        {" "}
        <div>
          <Chip
            className="my-1 w-full"
            label={`Single : ${parseFloat(
              parseFloat(Formik?.values?.buyPrice).toFixed(2) /
                sps_invoice?.length
            ).toFixed(2)}`}
          />
          <Chip
            className="my-1 w-full"
            label={`Each : ${parseFloat(
              parseFloat(
                parseFloat(Formik?.values?.buyPrice).toFixed(2) /
                  sps_invoice?.length
              ).toFixed(2) * parseInt(totalQuantity())
            ).toFixed(2)}`}
          />
        </div>
      </td>
      <td>
        <div>
          <Chip
            className="my-1 w-full"
            label={`Single : ${parseFloat(
              parseFloat(Formik?.values?.sellPrice).toFixed(2) /
                sps_invoice?.length
            ).toFixed(2)}`}
          />
          <Chip
            className="my-1 w-full"
            label={`Each : ${parseFloat(
              parseFloat(
                parseFloat(Formik?.values?.sellPrice).toFixed(2) /
                  sps_invoice?.length
              ).toFixed(2) * parseInt(totalQuantity())
            ).toFixed(2)}`}
          />
        </div>
      </td>
      <td>
        <div>
          <Chip
            className="my-1 w-full"
            label={`Single : ${
              parseFloat(
                parseFloat(Formik?.values?.sellPrice).toFixed(2) /
                  sps_invoice?.length
              ).toFixed(2) -
              parseFloat(
                parseFloat(Formik?.values?.buyPrice).toFixed(2) /
                  sps_invoice?.length
              ).toFixed(2)
            }`}
          />
          <Chip
            className="my-1 w-full"
            label={`Each : ${parseFloat(
              (parseFloat(
                parseFloat(Formik?.values?.sellPrice).toFixed(2) /
                  sps_invoice?.length
              ).toFixed(2) -
                parseFloat(
                  parseFloat(Formik?.values?.buyPrice).toFixed(2) /
                    sps_invoice?.length
                ).toFixed(2)) *
                parseInt(totalQuantity())
            ).toFixed(2)}`}
          />
        </div>
      </td>
      <td>
        <InvoiceStockQuantityDrawer qps_invoice={qps_invoice} sp={sp} />
      </td>
      <td className="sticky right-0 bg-white z-[300]">
        <div className="flex justify-between items-center">
          <div className="mx-2">
            {editindProduct === _id ? (
              <IconButton
                onClick={Formik.handleSubmit}
                className="bg-[green] text-white hover:bg-green-400"
              >
                <Done />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setEditingProduct(_id)}
                className="bg-[darkblue] text-white hover:bg-blue-400"
              >
                <Edit />
              </IconButton>
            )}
          </div>
          <div className="mx-2">
            <IconButton
              onClick={() => {
                setDeleteOpen(true);
                setDeletingProduct(sp);
              }}
              className="bg-[red] text-white hover:bg-red-500"
            >
              <Delete />
            </IconButton>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default InvoiceStockProductsRow;
