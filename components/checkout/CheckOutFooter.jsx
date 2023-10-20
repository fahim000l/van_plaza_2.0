import React from "react";
import { Divider } from "@mui/material";

const CheckOutFooter = ({ calculateItemsTotal, deleveryFee }) => {
  return (
    <div className="btm-nav z-[900] lg:hidden border-2 border-solid border-b-0 border-r-0 border-l-0 border-gray-500 h-12 bg-base-200">
      <div className="flex w-[50%]">
        <p>
          Total :{" "}
          <span className="font-bold text-[steelblue]">{`${
            parseFloat(calculateItemsTotal()) + deleveryFee
          } /-`}</span>{" "}
        </p>
      </div>
      <div className="w-[50%]">
        <button className="btn btn-primary btn-sm normal-case">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOutFooter;
