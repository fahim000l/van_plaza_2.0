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
  Chip,
} from "@mui/material";
import { Inbox, ShoppingCart, Mail } from "@mui/icons-material";
import useGetcartByUser from "@/hooks/useGetcartByUser";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { AspectRatio, Typography, Card, Badge } from "@mui/joy";
import CartCard from "./CartCard";
import toast from "react-hot-toast";
import useGetCartsByQpId from "@/hooks/useGetCartsByQpId";
import DeleteConfirmationDialog from "./common_dlt_confirmation-dialog";
import Link from "next/link";

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

  const {
    authUser: { carts },
  } = React.useContext(AUTH_CONTEXT);
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
          cartsRefetch();
          setDeleteOpen(false);
          toast.success("Cart Removed Successfully");
          setDeleteOpen(false);
        }
      });
  };

  const calCulateSubTotalPrice = () => {
    return carts?.reduce((total, newValue) => {
      return (
        total +
        parseFloat(newValue?.qps?.[0]?.sps?.[0].sellPrice) *
          parseFloat(newValue?.quantity)
      );
    }, 0);
  };

  const calculateTotalProducts = () => {
    return carts?.reduce((total, newValue) => {
      return total + parseInt(newValue?.quantity);
    }, 0);
  };

  React.useEffect(() => {
    if (carts) {
      if (carts?.length === 0) {
        toggleDrawer("right", false);
      }
    }
  }, [carts]);

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            disabled={carts?.length === 0}
            onClick={toggleDrawer(anchor, true)}
            className="text-white"
            size="small"
          >
            <Badge size="sm" badgeContent={calculateTotalProducts()}>
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className="w-full"
          >
            <div className="grid card bg-base-300 rounded-box lg:p-5 lg:m-5 p-2 h-full">
              {" "}
              <Card variant="outlined" sx={{ p: 0, marginTop: 2 }}>
                <List sx={{ py: "var(--ListDivider-gap)" }}>
                  {carts?.map((cart, i) => (
                    <CartCard
                      setDeleteOpen={setDeleteOpen}
                      setDeletingCart={setDeletingCart}
                      key={cart?._id}
                      carts_user={carts}
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
            <div className="sticky bottom-0 z-[200] bg-[steelblue]">
              <Divider />
              <div className="bg-base-300 rounded-box lg:p-5 lg:m-5 p-2 m-2">
                <p className="flex items-center my-2 font-bold justify-between">
                  <span>Sub Total :</span>{" "}
                  <Chip label={`${calCulateSubTotalPrice()} /-`} />{" "}
                </p>
                <p className="flex items-center my-2 font-bold justify-between">
                  <span>Total Products :</span>{" "}
                  <Chip label={`${calculateTotalProducts()}`} />
                </p>
                <Link href={"/checkout"}>
                  <Button
                    variant="contained"
                    className="bg-[steelblue] text-white"
                  >
                    Check Out ({carts?.length})
                  </Button>
                </Link>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
