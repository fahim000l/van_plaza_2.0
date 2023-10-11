import React from "react";

const CheckOutFooter = ({ calculateItemsTotal, deleveryFee }) => {
  return (
    <div className="btm-nav z-[900] lg:hidden">
      <div className="flex w-[50%] active">
        <p>
          Total :{" "}
          <span className="font-bold text-[steelblue]">{`${
            parseFloat(calculateItemsTotal()) + deleveryFee
          } /-`}</span>{" "}
        </p>
      </div>
      <div className="w-[50%] active">
        <button className="btn btn-primary btn-sm normal-case">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOutFooter;
