import React from "react";
import {
  AspectRatio,
  Typography,
  Card,
  ListDivider,
  ListItemContent,
  ListItem,
  ListItemButton,
} from "@mui/joy";

const CartCard = ({ cart }) => {
  const {
    qps: {
      [0]: { productName, standardImage },
    },
    qps: {
      [0]: {
        sps: {
          [0]: { sellPrice },
        },
      },
    },
  } = cart;

  return (
    <div>
      <ListItem>
        <ListItemButton sx={{ gap: 2 }}>
          <AspectRatio sx={{ flexBasis: 120 }}>
            <img src={standardImage} alt={productName} />
          </AspectRatio>
          <ListItemContent>
            <Typography fontWeight="md">{productName}</Typography>
            {/* <Typography level="body-sm">{item.description}</Typography> */}
          </ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListDivider />
    </div>
  );
};

export default CartCard;
