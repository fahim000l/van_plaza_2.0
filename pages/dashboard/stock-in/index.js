import InvoiceSummary from "@/components/dashboard/stock-in/InvoiceSummary";
import ProductsIn from "@/components/dashboard/stock-in/ProductsIn";
import SupplierIn from "@/components/dashboard/stock-in/SupplierIn";
import Dashboard from "@/layouts/Dashboard";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";

const StockIn = () => {
  const [records, setRecords] = useState([{}, {}, {}, {}, {}]);
  return (
    <Dashboard>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid card bg-base-300 rounded-box p-10">
          <SupplierIn />
        </div>
        <div className="divider" />
        <div className="grid card bg-base-300 rounded-box p-10">
          <ProductsIn setRecords={setRecords} records={records} />
          <Fab
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
            onClick={() => setRecords((r) => [...r, {}, {}, {}, {}, {}])}
            size="small"
            aria-label={"Add"}
            color="primary"
            className="bg-[darkblue]"
          >
            <Add />
          </Fab>
        </div>
        <div className="divider" />
        <div className="grid card bg-base-300 rounded-box p-10">
          <InvoiceSummary />
        </div>
      </div>
    </Dashboard>
  );
};

export default StockIn;
