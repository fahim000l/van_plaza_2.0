import OrderCard from "@/components/payment/OrderCard";
import useGetDbUser from "@/hooks/useGetDbUser";
import Main from "@/layouts/Main";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Avatar, Divider, Chip } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

const Payment = () => {
  const {
    query: { transId },
  } = useRouter();

  const { data } = useQuery({
    queryKey: ["get-order-by-trans_id", transId],
    queryFn: async () => {
      if (transId) {
        return await fetch(
          `/api/get-order-by-trans_id?transId=${transId}`
        ).then((res) => res.json());
      }
    },
  });

  const calculateItemsTotal = () => {
    return data?.ops?.reduce((total, op) => {
      return (
        total +
        parseFloat(op?.qpsInfo?.[0]?.spsInfo?.[0]?.sellPrice) *
          parseInt(op?.quantity)
      );
    }, 0);
  };

  const { dbUser } = useGetDbUser(data?.user);

  return (
    <Main>
      <div className="flex flex-col justify-center lg:mx-10 my-5 mx-2">
        <Chip
          className="text-center my-5"
          variant="filled"
          color="success"
          label={"Your Order has been confirmed"}
        />
        <div className="lg:flex justify-evenly items-start">
          <div className="lg:w-[45%] my-5">
            <div className="space-y-2 lg:p-5 p-2 rounded-box shadow-xl">
              <div className="flex justify-between items-center">
                <p className="mr-2 font-bold">Delever to :</p>{" "}
                {/* <IconButton className="bg-blue-200 text-blue-500">
                <Edit />
              </IconButton> */}
              </div>
              <div className="flex items-center">
                {" "}
                <div className="flex items-center">
                  <Avatar src={dbUser?.profilePic} />
                  <div className="mx-2">{dbUser?.userName}</div>
                </div>{" "}
              </div>
              <Divider />
              <div className="flex space-x-2">
                {" "}
                <Chip size="small" color="info" label={"Email"} />{" "}
                <span>{dbUser?.email}</span>
              </div>
              <Divider />
              <label
                htmlFor="chooseLocationModal"
                className="flex space-x-2 cursor-pointer"
              >
                {" "}
                <Chip size="small" color="info" label={"Home"} />{" "}
                <span className="flex justify-between w-full">
                  {data?.location?.Address?.address}
                </span>
              </label>
              <Divider />
              <label htmlFor="editProfileModal" className="flex space-x-2">
                {" "}
                <Chip size="small" color="info" label={"Contact"} />{" "}
                <span className="flex justify-between w-full">
                  {dbUser?.phone}
                </span>
              </label>
            </div>
            {data?.ops?.map((op) => (
              <OrderCard key={op?._id} op={op} />
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
                <Chip label={`${data?.deleveryFee} /-`} />
              </p>
              <p className="flex items-center my-2 font-bold justify-between">
                <span>Total :</span>{" "}
                <Chip
                  label={`${
                    parseFloat(calculateItemsTotal()) +
                    parseFloat(data?.deleveryFee)
                  } /-`}
                />
              </p>
              <p className="flex items-center my-2 font-bold justify-between">
                <span>Trans Id :</span> <Chip label={data?.transId} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Payment;
