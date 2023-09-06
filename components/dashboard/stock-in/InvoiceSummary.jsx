import { STOCK_IN_CONTEXT } from "@/contexts/StockInProvider";
import React, { useContext } from "react";
import { Chip, Button } from "@mui/material";
import usegetSupplierById from "@/hooks/usegetSupplierById";
import { LoadingButton } from "@mui/lab";

const InvoiceSummary = () => {
  const { Formik } = useContext(STOCK_IN_CONTEXT);

  let pureStockProducts = [];

  pureStockProducts = Formik.values.stockProducts.filter((sp) => sp !== "");

  const { supplier } = usegetSupplierById(Formik.values.supplierId);

  return (
    <div className="flex w-full">
      <div className="grid flex-grow card bg-base-300 rounded-box p-10">
        <p className="my-2 font-bold flex justify-between">
          <span>Total Products :</span>{" "}
          <Chip label={pureStockProducts?.length} />{" "}
        </p>
        <p className="my-2 font-bold flex justify-between">
          <span>Total Buy Price :</span>{" "}
          <Chip
            label={`${
              pureStockProducts?.length > 0
                ? pureStockProducts
                    ?.reduce((total, newValue) => {
                      return total + parseFloat(newValue?.buyPrice);
                    }, 0)
                    .toFixed(3)
                : 0
            } /-`}
          />{" "}
        </p>
        <p className="my-2 font-bold flex justify-between">
          <span>Total Sell Price :</span>{" "}
          <Chip
            label={`${
              pureStockProducts?.length > 0
                ? pureStockProducts
                    ?.reduce((total, newValue) => {
                      return total + parseFloat(newValue?.sellPrice);
                    }, 0)
                    .toFixed(3)
                : 0
            } /-`}
          />{" "}
        </p>
        <p className="my-2 font-bold flex justify-between">
          <span>Average Buy Price :</span>{" "}
          <Chip
            label={`${
              pureStockProducts?.length > 0
                ? (
                    pureStockProducts?.reduce((total, newValue) => {
                      return total + parseFloat(newValue?.buyPrice);
                    }, 0) / pureStockProducts?.length
                  ).toFixed(3)
                : 0
            } /-`}
          />{" "}
        </p>
        <p className="my-2 font-bold flex justify-between">
          <span>Average Sell Price :</span>{" "}
          <Chip
            label={`${
              pureStockProducts?.length > 0
                ? (
                    pureStockProducts?.reduce((total, newValue) => {
                      return total + parseFloat(newValue?.sellPrice);
                    }, 0) / pureStockProducts?.length
                  ).toFixed(3)
                : 0
            } /-`}
          />{" "}
        </p>
      </div>
      <div className="divider divider-horizontal" />
      <div className="flex flex-col justify-between flex-grow card bg-base-300 rounded-box p-10">
        <div>
          <p className="my-2 font-bold flex justify-between">
            <span>Supplier Name :</span>{" "}
            <Chip label={supplier?.supplierName || "null"} />{" "}
          </p>
          <p className="my-2 font-bold flex justify-between">
            <span>Supplier Contact Info :</span>{" "}
            <Chip label={supplier?.contactInfo || "null"} />{" "}
          </p>
          <p className="my-2 font-bold flex justify-between">
            <span>Invoice Date :</span>{" "}
            <Chip label={Formik?.values?.date || "null"} />{" "}
          </p>
          <p className="my-2 font-bold flex justify-between">
            <span>Invoice Trans Id :</span>{" "}
            <Chip label={Formik?.values?.transId || "null"} />{" "}
          </p>
        </div>
        {/* <Button
          onClick={Formik.handleSubmit}
          variant="contained"
          className="bg-[darkblue] h-10"
        >
          Stock In
        </Button> */}
      </div>
    </div>
  );
};

export default InvoiceSummary;
