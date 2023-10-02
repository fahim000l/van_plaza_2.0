import React from "react";
import { Avatar, Divider, Chip } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

const OrderCard = ({ op }) => {
  const {
    quantity,
    qpsInfo: {
      [0]: {
        sizeInfo: {
          [0]: { sizeName },
        },
        spsInfo: {
          [0]: {
            sellPrice,
            productInfo: {
              [0]: { standardImage, productName },
            },
          },
        },
      },
    },
  } = op;

  return (
    <div className="space-y-2 lg:p-5 p-2 card rounded-box shadow-xl">
      <div className="lg:flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <img className="w-12 h-12 rounded-lg" src={standardImage} alt="" />
          <div>
            <p>{productName}</p>
            <p>Size :{sizeName}</p>
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          <span>Qty : </span> <span>{quantity}</span>
        </div>
        <div className="flex space-x-2 items-center text-[steelblue] font-bold">
          {sellPrice}/-
        </div>
      </div>
      <Divider />
      <div className="font-bold lg:text-end">
        {quantity} item(s). Subtotal :{" "}
        <span className="text-[steelblue] font-bold">
          {parseFloat(sellPrice) * parseInt(quantity)}/-
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
