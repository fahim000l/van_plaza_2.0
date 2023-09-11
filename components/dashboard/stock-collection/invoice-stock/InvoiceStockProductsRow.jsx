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
}) => {
  const { _id, productId, transId, buyPrice, sellPrice, invoiceId } = sp;

  const { sps_invoice, sps_invoice_refetch } = useGetPsByInvoiceId(invoiceId);
  const { invoicesRefetch } = useGetAllInvoices();

  const { qps_product_invoice, qps_product_invoice_refetch } =
    useGetQsByProductIdInvoiceId(productId, invoiceId);

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
            sps_invoice_refetch();
            qps_product_invoice_refetch();
            invoicesRefetch();
            setEditingProduct("");
            toast.success(
              `Ps Id : ${_id} of Invoice Id : ${invoiceId} modified successfully`
            );
          }
        });
    },
  });
  const { product } = useGetProductById(Formik?.values?.productId);
  const { products } = useGetAllProducts();
  const { category } = useGetCategoryById(product?.categoryId);

  console.log(qps_product_invoice);

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
                <img
                  src={`/uploads/images/products/${product?.standardImage}`}
                />
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
                value={product}
                imgType={"products"}
                imgSrc={"standardImage"}
                globalLabel={"productName"}
              />
              <Chip className="my-1 w-full" label={category?.categoryName} />
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
        <InvoiceStockQuantityDrawer sp={sp} />
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
            <IconButton className="bg-[red] text-white hover:bg-red-500">
              <Delete />
            </IconButton>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default InvoiceStockProductsRow;
