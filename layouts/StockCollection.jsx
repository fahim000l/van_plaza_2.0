import React from "react";
import Dashboard from "./Dashboard";
import Link from "next/link";
import { useRouter } from "next/router";

const StockCollection = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <Dashboard>
      <div className="tabs tabs-boxed">
        <Link
          href={"/dashboard/stock-collection/products-stock"}
          className={`tab w-[50%] ${
            pathname.includes("/products-stock") ? "tab-active" : ""
          }`}
        >
          Products Stock
        </Link>
        <Link
          href={"/dashboard/stock-collection/invoice-stock"}
          className={`tab w-[50%] ${
            pathname.includes("/invoice-stock") ? "tab-active" : ""
          }`}
        >
          Invoice Stock
        </Link>
      </div>
      <div className="my-10">{children}</div>
    </Dashboard>
  );
};

export default StockCollection;
