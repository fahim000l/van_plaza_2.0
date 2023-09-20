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
import {
  AspectRatio,
  Typography,
  Card,
  ListDivider,
  ListItemContent,
} from "@mui/joy";
import CartCard from "./CartCard";

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

  const { carts_user } = useGetcartByUser(authUser?.email);

  React.useEffect(() => {
    if (carts_user) {
      console.log(carts_user);
    }
  }, [carts_user]);

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            className="text-white"
          >
            <ShoppingCart />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="grid card bg-base-300 rounded-box place-items-center p-5 m-5">
              {" "}
              <Card variant="outlined" sx={{ width: 300, p: 0 }}>
                <List sx={{ py: "var(--ListDivider-gap)" }}>
                  {carts_user?.map((cart, i) => (
                    <CartCard
                      key={cart?._id}
                      carts_user={carts_user}
                      cart={cart}
                      i={i}
                    />
                  ))}
                </List>
              </Card>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
