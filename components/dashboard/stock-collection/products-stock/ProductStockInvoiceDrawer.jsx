import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Chip,
} from "@mui/material";
import { Inbox, Mail } from "@mui/icons-material";
import useGetPsByProductId from "@/hooks/useGetPsByProductId";
import ProductStockInvoiceTable from "./ProductStockInvoiceTable";

export default function ProductStockInvoiceDrawer({ product }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { sps_product } = product;

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Chip label={sps_product?.length} />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {sps_product?.map((sp) => (
              <ProductStockInvoiceTable key={sp?._id} sp={sp} />
            ))}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
