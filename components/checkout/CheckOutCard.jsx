import React from "react";
import { IconButton, Divider } from "@mui/material";
import { Delete } from "@mui/icons-material";

const CheckOutCard = ({ cart }) => {
  const {
    quantity: cartQuantity,
    qps: {
      [0]: {
        sps: {
          [0]: { sellPrice },
        },
        products: {
          [0]: { productName, standardImage },
        },
        sizes: {
          [0]: { sizeName },
        },
      },
    },
  } = cart;

  return (
    <div className="space-y-2 lg:p-5 p-2 card rounded-box shadow-xl">
      <div className="lg:flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <img className="w-12 h-12 rounded-lg" src={standardImage} alt="" />
          <div>
            <p>{productName?.split("-")[0]}</p>
            <p>Size :{sizeName}</p>
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          <span>Qty : </span> <span>{cartQuantity}</span>
        </div>
        <div className="flex space-x-2 items-center text-[steelblue] font-bold">
          {sellPrice}/-
        </div>
      </div>
      <Divider />
      <div className="font-bold lg:text-end">
        {cartQuantity} item(s). Subtotal :{" "}
        <span className="text-[steelblue] font-bold">
          {parseFloat(sellPrice) * parseInt(cartQuantity)}/-
        </span>
      </div>
    </div>
  );
};

export default CheckOutCard;
