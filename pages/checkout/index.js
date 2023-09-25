import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import Main from "@/layouts/Main";
import React, { useContext } from "react";
import { Avatar, Chip, Divider, Button, IconButton } from "@mui/material";
import useGetcartByUser from "@/hooks/useGetcartByUser";
import CheckOutCard from "@/components/checkout/CheckOutCard";
import { Edit } from "@mui/icons-material";
import CheckOutFooter from "@/components/checkout/CheckOutFooter";

const CheckOutPage = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const { carts_user } = useGetcartByUser(authUser?.email);

  const calculateItemsTotal = () => {
    return carts_user?.reduce((total, newValue) => {
      return (
        total +
        parseFloat(newValue?.qps?.[0]?.sps?.[0].sellPrice) *
          parseFloat(newValue?.quantity)
      );
    }, 0);
  };

  const deleveryFee = 100;

  return (
    <Main>
      <div className="lg:flex justify-evenly items-start lg:mx-10 my-5 mx-2">
        <div className="lg:w-[45%] my-5">
          <div className="space-y-2 lg:p-5 p-2 rounded-box shadow-xl">
            <div className="flex justify-between items-center">
              <p className="mr-2 font-bold">Delever to :</p>{" "}
              <IconButton className="bg-blue-200 text-blue-500">
                <Edit />
              </IconButton>
            </div>
            <div className="flex items-center cursor-pointer">
              {" "}
              <div className="flex items-center">
                <Avatar src={authUser?.profilePic} />
                <div className="mx-2">{authUser?.userName}</div>
              </div>{" "}
            </div>
            <Divider />
            <div className="flex space-x-2 cursor-pointer">
              {" "}
              <Chip size="small" color="info" label={"Home"} />{" "}
              <span>217, SheikMujib road, agrabad Chittagong</span>
            </div>
            <Divider />
            <div className="flex space-x-2 cursor-pointer">
              {" "}
              <Chip size="small" color="info" label={"Email"} />{" "}
              <span>{authUser?.email}</span>
            </div>
            <Divider />
            <div className="flex space-x-2 cursor-pointer">
              {" "}
              <Chip size="small" color="info" label={"Contact"} />{" "}
              <span>01726834600</span>
            </div>
          </div>
          {carts_user?.map((cart) => (
            <CheckOutCard key={cart?._id} cart={cart} />
          ))}
        </div>
        <div className="rounded-lg shadow-lg bg-[steelblue] lg:w-[45%]">
          <Divider />
          <div className="bg-base-300 rounded-box lg:p-5 lg:m-5 p-2 m-2">
            <p className="flex items-center my-2 font-bold justify-between">
              <span>Ttems Total :</span>{" "}
              <Chip label={`${calculateItemsTotal()} /-`} />{" "}
            </p>
            <p className="flex items-center my-2 font-bold justify-between">
              <span>Delivery Charge :</span>{" "}
              <Chip label={`${deleveryFee} /-`} />
            </p>
            <p className="flex items-center my-2 font-bold justify-between">
              <span>Total :</span>{" "}
              <Chip
                label={`${parseFloat(calculateItemsTotal()) + deleveryFee} /-`}
              />
            </p>
            <Button
              variant="contained"
              className="bg-[steelblue] text-white hidden lg:inline"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
      <CheckOutFooter
        deleveryFee={deleveryFee}
        calculateItemsTotal={calculateItemsTotal}
      />
    </Main>
  );
};

export default CheckOutPage;
