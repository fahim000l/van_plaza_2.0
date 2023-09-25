import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import Main from "@/layouts/Main";
import React, { useContext } from "react";
import { Avatar, Chip, Divider, Button } from "@mui/material";
import useGetcartByUser from "@/hooks/useGetcartByUser";
import CheckOutCard from "@/components/checkout/CheckOutCard";

const CheckOutPage = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const { carts_user } = useGetcartByUser(authUser?.email);

  return (
    <Main>
      <div className="flex justify-between items-start lg:mx-10 my-10 mx-2">
        <div className="lg:w-[50%]">
          <div className="space-y-2 p-10 card rounded-box shadow-xl">
            <div className="flex items-center">
              {" "}
              <p className="mr-2 font-bold">Delever to :</p>{" "}
              <div className="flex items-center">
                <Avatar src={authUser?.profilePic} />
                <div className="mx-2">{authUser?.userName}</div>
              </div>{" "}
            </div>
            <div>
              {" "}
              <Chip color="info" label={"Home"} />{" "}
              <span>217, SheikMujib road, agrabad Chittagong</span>
            </div>
            <div>
              {" "}
              <Chip color="info" label={"Email"} />{" "}
              <span>{authUser?.email}</span>
            </div>
            <div>
              {" "}
              <Chip color="info" label={"Contact"} /> <span>01726834600</span>
            </div>
          </div>
          {carts_user?.map((cart) => (
            <CheckOutCard key={cart?._id} cart={cart} />
          ))}
        </div>
        <div className="lg:static sticky bottom-0 z-[200] bg-[steelblue] lg:w-[50%]">
          <Divider />
          <div className="bg-base-300 rounded-box lg:p-5 lg:m-5 p-2 m-2">
            <p className="flex items-center my-2 font-bold justify-between">
              <span>Sub Total :</span> <Chip label={`Something /-`} />{" "}
            </p>
            <p className="flex items-center my-2 font-bold justify-between">
              <span>Total Products :</span> <Chip label={`Something`} />
            </p>
            <Button variant="contained" className="bg-[steelblue] text-white">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CheckOutPage;
