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
      const pureStockProducts = values?.stockProducts?.filter(
        (sp) => sp !== ""
      );

      // console.log(pureStockProducts);
      // pureStockProducts.map((sp) => {
      //   const formData = new FormData();

      //   if (sp.flaw1) {
      //     formData.append(`flaw1_${sp.productId}`, sp.flaw1);
      //   }

      //   if (sp.flaw2) {
      //     formData.append(`flaw2_${sp.productId}`, sp.flaw2);
      //   }

      //   if (sp.flaw3) {
      //     formData.append(`flaw3_${sp.productId}`, sp.flaw3);
      //   }

      //   fetch(
      //     `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_BB_SECRET}`,
      //     {
      //       method: "POST",
      //       body: formData,
      //     }
      //   )
      //     .then((res) => res.json())
      //     .then((imageData) => {
      //       console.log(imageData);
      //     });
      // });
    },
  });

  const stockInInfo = { Formik };
  // console.log(process.env.IMAGE_BB_SECRET);

  return (
    <STOCK_IN_CONTEXT.Provider value={stockInInfo}>
      {children}
    </STOCK_IN_CONTEXT.Provider>
  );
};

export default StockInProvider;
