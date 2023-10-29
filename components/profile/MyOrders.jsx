import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext } from "react";
import OrderCard from "./OrderCard";

const MyOrders = () => {
  const {
    authUser: { ops },
  } = useContext(AUTH_CONTEXT);

  return (
    <div id="myOrders" className="grid card bg-[#222745] rounded-box p-5 my-2">
      <div className="flex justify-between mb-5">
        <p className="font-bold text-white w-full">My Orders</p>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
        {ops?.map((op) => (
          <OrderCard op={op} key={op?._id} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
