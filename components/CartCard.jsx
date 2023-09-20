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

const CartCard = ({ carts_user, cart, i, setDeletingCart, setDeleteOpen }) => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const {
    quantity,
    qps,
    qps: {
      [0]: {
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
  const { carts, cartsRefetch } = useGetCartsByQpId(qps?.[0]?._id);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (carts) {
      setTotalQuantity(
        carts?.reduce((total, newValue) => {
          return total + parseInt(newValue?.quantity);
        }, 0)
      );
      console.log(carts);
      console.log(totalQuantity);
      console.log(qpQuantity);
    }
  }, [carts]);

  const handleIncrease = () => {
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
        }
      });
  };

  const handleDecrease = () => {
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
        }
      });
  };

  return (
    <div className="p-2 w-full">
      <ListItem sx={{ width: "100%" }}>
        <ListItemButton sx={{ gap: 2, width: "100%" }}>
          {/* <AspectRatio sx={{ flexBasis: 120 }}> */}
          <div className="avatar">
            <div className="w-16 rounded">
              <img src={standardImage} alt={productName} />
            </div>
          </div>
          {/* </AspectRatio> */}
          <ListItemContent sx={{ width: "100%" }}>
            <div className="flex lg:space-x-10 items-start lg:items-center">
              <div className="lg:flex w-full lg:items-center lg:space-x-10">
                <div>
                  <Typography fontWeight="md">{productName}</Typography>
                  <Typography level="body-sm">Size : {sizeName}</Typography>
                </div>
                <div className="flex justify-between items-center lg:space-x-10">
                  <Chip color="primary" label={categoryName} />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col-reverse items-center lg:space-x-10">
                <div className="flex items-center">
                  <IconButton
                    disabled={parseInt(qpQuantity) === parseInt(totalQuantity)}
                    onClick={handleIncrease}
                    className="bg-[green] text-white"
                    size="sm"
                    variant="solid"
                    color="success"
                  >
                    <Add />
                  </IconButton>
                  <Chip
                    className="mx-2 my-2"
                    color="primary"
                    label={quantity}
                  />
                  <IconButton
                    disabled={parseInt(quantity) === 1}
                    onClick={handleDecrease}
                    className="bg-[red] text-white"
                    size="sm"
                    variant="solid"
                    color="danger"
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
        </ListItemButton>
      </ListItem>
      {i !== carts_user.length - 1 && <ListDivider />}
    </div>
  );
};

export default CartCard;
