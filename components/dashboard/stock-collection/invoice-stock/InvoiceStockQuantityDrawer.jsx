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
import useGetSizesByCategory from "@/hooks/useGetSizesByCategory";
import useGetProductById from "@/hooks/useGetProductById";
import useGetQsByProductIdInvoiceId from "@/hooks/useGetQsByProductIdInvoiceId";
import useGetQsByProductId from "@/hooks/useGetQsByProductId";
import InvoiceStockQuantiryRow from "./InvoiceStockQuantiryRow";
import useGetQsByProductIdSizeId from "@/hooks/useGetQsByProductIdSizeId";

export default function InvoiceStockQuantityDrawer({ sp }) {
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

  const { _id, productId, transId, buyPrice, sellPrice, invoiceId } = sp;
  const { product } = useGetProductById(productId);

  const { qps_product_invoice } = useGetQsByProductIdInvoiceId(
    productId,
    invoiceId
  );

  const { sizes_category } = useGetSizesByCategory(product?.categoryId);
  const [editingQuantity, setEditingQuantity] = React.useState("");

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Chip
              label={qps_product_invoice?.reduce((total, newValue) => {
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
                      <InvoiceStockQuantiryRow
                        key={size?._id}
                        size={size}
                        sp={sp}
                        product={product}
                        editingQuantity={editingQuantity}
                        setEditingQuantity={setEditingQuantity}
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
