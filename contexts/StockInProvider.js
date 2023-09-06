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
      transId: new Date().getTime(),
      stockProducts: [],
    },
  });

  useEffect(() => {
    console.log(Formik.values);
  }, [Formik]);

  const stockInInfo = { Formik };

  return (
    <STOCK_IN_CONTEXT.Provider value={stockInInfo}>
      {children}
    </STOCK_IN_CONTEXT.Provider>
  );
};

export default StockInProvider;
