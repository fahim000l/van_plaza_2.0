import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

export const STOCK_IN_CONTEXT = createContext();

const StockInProvider = ({ children }) => {
  const { push } = useRouter();
  const [stockInLoader, setStockInLoader] = useState(false);

  const Formik = useFormik({
    initialValues: {
      supplierId: "",
      date: `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
      transId: `auto-${new Date().getTime()}`,
      stockProducts: ["", "", "", "", ""],
    },
    onSubmit: (values) => {
      setStockInLoader(true);
      const invoiceData = values;
      const productsData = invoiceData?.stockProducts?.filter(
        (sp) => sp !== ""
      );

      delete invoiceData.stockProducts;

      const quantityData = [];
      console.log(productsData);
      productsData.forEach((sp, i) => {
        if (sp.flaw1) {
          handleUploadImage(sp.flaw1)
            .then((res) => res.json())
            .then((imgdata) => {
              console.log(imgdata);
              sp.flaw1 = imgdata?.data?.url;
              sp.flaw1_delete_url = imgdata?.data?.delete_url;
            });
        }

        if (sp.flaw2) {
          handleUploadImage(sp.flaw2)
            .then((res) => res.json())
            .then((imgdata) => {
              console.log(imgdata);
              sp.flaw2 = imgdata?.data?.url;
              sp.flaw2_delete_url = imgdata?.data?.delete_url;
            });
        }

        if (sp.flaw3) {
          handleUploadImage(sp.flaw3)
            .then((res) => res.json())
            .then((imgData) => {
              console.log(imgData);
              sp.flaw3 = imgData?.data?.url;
              sp.flaw3_delete_url = imgData?.data?.delete_url;
            });
        }

        sp.quantities?.forEach((spq) => {
          if (spq?.size && spq?.quantity) {
            quantityData.push(spq);
          }
        });

        delete sp.quantities;
      });

      const stockData = {
        invoiceData,
        productsData,
        quantityData,
      };

      fetch("/api/store-stock", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(stockData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            setStockInLoader(false);
            push("/dashboard/stock-collection/products-stock");
          }
        });

      console.log(stockData);
    },
  });

  const stockInInfo = { Formik, stockInLoader };
  // console.log(process.env.IMAGE_BB_SECRET);

  const handleUploadImage = (uploadingImage) => {
    const formData = new FormData();
    formData.append("image", uploadingImage);
    return fetch(
      `https://api.imgbb.com/1/upload?key=1d50029a0cf2cac0749a3ea1640c6afc`,
      {
        method: "POST",
        body: formData,
      }
    );
  };

  return (
    <STOCK_IN_CONTEXT.Provider value={stockInInfo}>
      {children}
    </STOCK_IN_CONTEXT.Provider>
  );
};

export default StockInProvider;
