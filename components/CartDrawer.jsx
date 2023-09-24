import * as React from "react";
import Box from "@mui/material/Box";
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Inbox, ShoppingCart, Mail } from "@mui/icons-material";
import useGetcartByUser from "@/hooks/useGetcartByUser";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { AspectRatio, Typography, Card, Badge } from "@mui/joy";
import CartCard from "./CartCard";
import toast from "react-hot-toast";
import useGetCartsByQpId from "@/hooks/useGetCartsByQpId";
import DeleteConfirmationDialog from "./common_dlt_confirmation-dialog";

export default function CartDrawer() {
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

  const { authUser } = React.useContext(AUTH_CONTEXT);

  const { carts_user, carts_user_refetch } = useGetcartByUser(authUser?.email);
  const [deletingCart, setDeletingCart] = React.useState(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const { cartsRefetch } = useGetCartsByQpId(deletingCart?.qps?.[0]?._id);

  const handleDeleteCart = () => {
    fetch(`/api/remove-cart?cartId=${deletingCart?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          carts_user_refetch();
          cartsRefetch();
          toast.success("Cart Removed Successfully");
          setDeleteOpen(false);
        }
      });
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            className="text-white"
          >
            <Badge badgeContent={carts_user?.length}>
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className="w-full"
          >
            <div className="grid card bg-base-300 rounded-box place-items-center lg:p-5 lg:m-5">
              {" "}
              <Card variant="outlined" sx={{ p: 0 }}>
                <List sx={{ py: "var(--ListDivider-gap)" }}>
                  {carts_user?.map((cart, i) => (
                    <CartCard
                      setDeleteOpen={setDeleteOpen}
                      setDeletingCart={setDeletingCart}
                      key={cart?._id}
                      carts_user={carts_user}
                      cart={cart}
                      i={i}
                    />
                  ))}
                </List>
              </Card>
            </div>
            <DeleteConfirmationDialog
              actionFunction={handleDeleteCart}
              confirmMessage={"Are you sure to remove the item from cart ?"}
              confirmTitle={"Confirmation for removing item from cart"}
              open={isDeleteOpen}
              setOpen={setDeleteOpen}
            />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}