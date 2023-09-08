import { useFormik } from "formik";
import React, { createContext, useEffect } from "react";

export const STOCK_IN_CONTEXT = createContext();

const StockInProvider = ({ children }) => {
  const Formik = useFormik({
    initialValues: {
      supplierId: "",
      date: `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
      transId: `auto-${new Date().getTime()}`,
      stockProducts: [],
    },
    onSubmit: (values) => {
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
          quantityData.push(spq);
        });

        delete sp.quantities;
      });

      const stockData = {
        invoiceData,
        productsData,
        quantityData,
      };

      fetch("/api/store-invoices", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      })
        .then((res) => res.json())
        .then((invoiceResult) => {
          console.log(invoiceResult);
          if (invoiceResult?.acknowledged) {
            const invoiceId = invoiceResult?.insertedId;
            productsData?.forEach((pd) => (pd.invoiceId = invoiceId));
            quantityData?.forEach((qd) => (qd.invoiceId = invoiceId));

            fetch("/api/store-products-stocks", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(productsData),
            })
              .then((res) => res.json())
              .then((productsResult) => {
                console.log(productsResult);
                if (productsResult?.acknowledged) {
                  fetch("/api/store-quantities-stock", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(quantityData),
                  })
                    .then((res) => res.json())
                    .then((quantitiesResult) => {
                      console.log(quantitiesResult);
                      if (quantitiesResult?.acknowledged) {
                        values.date = "";
                        values.stockProducts = [];
                        values.supplierId = "";
                        values.transId = "";
                      }
                    });
                }
              });
          }
        });

      console.log(stockData);
    },
  });

  const stockInInfo = { Formik };
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
