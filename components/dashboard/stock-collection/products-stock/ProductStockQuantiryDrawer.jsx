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
import useGetSizesByCategory from "@/hooks/useGetSizesByCategory";
import ProductStockQuantityRow from "./ProductStockQuantityRow";
import useGetQsByProductIdSizeId from "@/hooks/useGetQsByProductIdSizeId";
import useGetQsByProductId from "@/hooks/useGetQsByProductId";

export default function ProductStockQuantiryDrawer({ product }) {
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

  const { sizes_category } = useGetSizesByCategory(product?.categoryId);

  const { qps_product } = useGetQsByProductId(product?._id);

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Chip
              label={qps_product?.reduce((total, newValue) => {
                return total + parseInt(newValue?.quantity);
              }, 0)}
            />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="grid card bg-base-300 rounded-box m-5">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Size Id</th>
                      <th>Size</th>
                      <th>Total Quantity</th>
                      <th>Attr</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes_category?.map((size) => (
                      <ProductStockQuantityRow
                        key={size?._id}
                        product={product}
                        size={size}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
