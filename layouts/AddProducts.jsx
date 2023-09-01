import React from "react";
import Dashboard from "./Dashboard";
import Link from "next/link";
import { useRouter } from "next/router";

const AddProducts = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <Dashboard>
      <div className={`tabs tabs-boxed`}>
        <Link
          href={"/dashboard/add-products/regular-image"}
          className={`tab w-[25%] ${
            pathname.includes("regular-image") && "tab-active"
          }`}
        >
          Add Regular Image
        </Link>
        <Link
          href={"/dashboard/add-products/detailed-image"}
          className={`tab w-[25%] ${
            pathname.includes("detailed-image") && "tab-active"
          }`}
        >
          Add Detailed Image
        </Link>
        <Link
          href={"/dashboard/add-products/standard-image"}
          className={`tab w-[25%] ${
            pathname.includes("standard-image") && "tab-active"
          }`}
        >
          Add Standard Image
        </Link>
        <Link
          href={"/dashboard/add-products/product-details-form"}
          className={`tab w-[25%] ${
            pathname.includes("product-details-form") && "tab-active"
          }`}
        >
          Product Details
        </Link>
      </div>
      <div className="p-5">{children}</div>
    </Dashboard>
  );
};

export default AddProducts;
