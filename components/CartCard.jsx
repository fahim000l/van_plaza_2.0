import React from "react";
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
import { Add, Remove } from "@mui/icons-material";

const CartCard = ({ carts_user, cart, i }) => {
  const {
    quantity,
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
      },
    },
  } = cart;

  return (
    <div className="p-2">
      <ListItem sx={{ width: "100%" }}>
        <ListItemButton sx={{ gap: 2 }}>
          {/* <AspectRatio sx={{ flexBasis: 120 }}> */}
          <div className="avatar">
            <div className="w-20 rounded">
              <img src={standardImage} alt={productName} />
            </div>
          </div>
          {/* </AspectRatio> */}
          <ListItemContent sx={{ width: "100%" }}>
            <div className="flex justify-between">
              <Typography fontWeight="md">{productName}</Typography>
              <Chip color="primary" label={categoryName} />
            </div>
            <div className="flex justify-between">
              <Typography level="body-sm">Size : {sizeName}</Typography>
              <div className="flex items-center">
                <IconButton
                  className="bg-[green] text-white"
                  size="sm"
                  variant="solid"
                  color="success"
                >
                  <Add />
                </IconButton>
                <Chip className="mx-2 my-2" color="primary" label={quantity} />
                <IconButton
                  className="bg-[red] text-white"
                  size="sm"
                  variant="solid"
                  color="danger"
                >
                  <Remove />
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
