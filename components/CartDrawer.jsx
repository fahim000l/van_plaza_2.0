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

  const data = [
    {
      src: "https://images.unsplash.com/photo-1502657877623-f66bf489d236",
      title: "Night view",
      description: "4.21M views",
    },
    {
      src: "https://images.unsplash.com/photo-1527549993586-dff825b37782",
      title: "Lake view",
      description: "4.74M views",
    },
    {
      src: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36",
      title: "Mountain view",
      description: "3.98M views",
    },
  ];

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
            <Card variant="outlined" sx={{ width: 300, p: 0 }}>
              <List sx={{ py: "var(--ListDivider-gap)" }}>
                {carts_user?.map((cart) => (
                  <CartCard key={cart?._id} cart={cart} />
                ))}
              </List>
            </Card>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
