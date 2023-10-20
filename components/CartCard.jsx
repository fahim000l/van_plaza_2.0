import React, { useContext, useEffect, useState } from "react";
import {
  AspectRatio,
  Typography,
  Card,
  ListDivider,
  ListItemContent,
  ListItem,
  ListItemButton,
  IconButton,
} from "@mui/joy";
import { Chip } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import useGetcartByUser from "@/hooks/useGetcartByUser";
import useGetCartsByQpId from "@/hooks/useGetCartsByQpId";
import { LoadingButton } from "@mui/lab";

const CartCard = ({ carts_user, cart, i, setDeletingCart, setDeleteOpen }) => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const {
    quantity: cartQuantity,
    qps,
    qps: {
      [0]: {
        sps: {
          [0]: { sellPrice },
        },
        products: {
          [0]: {
            productName,
            standardImage,
            categories: {
              [0]: { categoryName },
            },
          },
        },
        sizes: {
          [0]: { sizeName },
        },
        quantity: qpQuantity,
      },
    },
  } = cart;

  const { carts_user_refetch } = useGetcartByUser(authUser?.email);
  const { carts, cartsRefetch } = useGetCartsByQpId(cart?.qps?.[0]?._id);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (carts) {
      setTotalQuantity(
        carts?.reduce((total, newValue) => {
          return total + parseInt(newValue?.quantity);
        }, 0)
      );
    }
  }, [carts]);

  const handleIncrease = () => {
    setLoader(true);
    const cartInfo = {
      qpId: qps?.[0]?._id,
      user: authUser?.email,
    };

    fetch("/api/store-cart", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          cartsRefetch();
          carts_user_refetch();
          setLoader(false);
        }
      });
  };

  const handleDecrease = () => {
    setLoader(true);
    const cartInfo = {
      qpId: qps?.[0]?._id,
      user: authUser?.email,
    };

    fetch("/api/delete-cart", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          cartsRefetch();
          carts_user_refetch();
          setLoader(false);
        }
      });
  };

  return (
    <div className="p-1 w-full shadow-lg">
      <ListItem sx={{ width: "100%", gap: 1 }}>
        {/* <ListItemButton sx={{ gap: 1, width: "100%" }}> */}
        <img
          className="w-20 h-20 rounded-lg"
          src={standardImage}
          alt={productName?.split("-")[0]}
        />
        <ListItemContent sx={{ width: "100%" }}>
          <div className="flex lg:space-x-10 items-start lg:items-center">
            <div className="lg:flex w-full lg:items-center lg:space-x-10">
              <div>
                <Typography fontWeight="md">
                  {productName?.split("-")[0]}
                </Typography>
                <Typography level="body-sm">Size : {sizeName}</Typography>
              </div>
              <p className="font-bold text-[steelblue]">{sellPrice}/-</p>
              <Chip size="small" color="primary" label={categoryName} />
            </div>
            <div className="flex lg:flex-row flex-col-reverse items-center lg:space-x-10">
              <div className="flex items-center">
                <IconButton
                  disabled={
                    parseInt(qpQuantity) === parseInt(totalQuantity) || loader
                  }
                  onClick={handleIncrease}
                  className="bg-[green] hover:bg-green-800 hover:text-white text-white"
                  size="small"
                  color="success"
                >
                  <Add />
                </IconButton>
                <Chip
                  size="small"
                  className="mx-2 my-2"
                  color="primary"
                  label={cartQuantity}
                />
                <IconButton
                  disabled={parseInt(cartQuantity) === 1 || loader}
                  onClick={handleDecrease}
                  className="bg-[red] hover:bg-red-800 hover:text-white text-white"
                  size="small"
                  color="error"
                >
                  <Remove />
                </IconButton>
              </div>

              <IconButton
                onClick={() => {
                  setDeleteOpen(true);
                  setDeletingCart(cart);
                }}
                size="sm"
                variant="solid"
                color="danger"
                className="bg-[#691414] text-white ml-auto"
              >
                <Delete />
              </IconButton>
            </div>
          </div>
        </ListItemContent>
        {/* </ListItemButton> */}
      </ListItem>
      {/* {i !== carts_user.length - 1 && <ListDivider />} */}
    </div>
  );
};

export default CartCard;
