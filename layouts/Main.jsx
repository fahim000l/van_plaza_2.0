import * as React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Drawer,
  Box,
  Button,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
const Header = dynamic(() =>
  import("@/components/main_header", {
    ssr: false,
  })
);
import { Toolbar } from "@mui/material";
import { FaTshirt, FaPhone } from "react-icons/fa";
import { Home, Mail } from "@mui/icons-material";
import MenuDrawer from "@/components/common_menu-drawer";
import Link from "next/link";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";

const drawerWidth = 240;
const navItems = [
  {
    path: "/",
    content: "Home",
    icon: <Home />,
  },
  {
    path: "/clothings",
    content: "Clothings",
    icon: <FaTshirt />,
  },
  {
    path: "/contact-us",
    content: "Contact Us",
    icon: <Mail />,
  },
];

const authItems = [
  {
    path: "/",
    content: "Profile",
    icon: <Avatar />,
  },
  {
    path: "/clothings",
    content: "My Account",
    icon: <Avatar />,
  },
  {
    path: "/contact-us",
    content: "Add Another Account",
    icon: <PersonAdd />,
  },
  {
    path: "/contact-us",
    content: "Settinsgs",
    icon: <Settings />,
  },
  {
    path: "/contact-us",
    content: "LogOut",
    icon: <Logout />,
  },
];

function Main({ window, children }) {
  const { authUser } = React.useContext(AUTH_CONTEXT);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header setMobileOpen={setMobileOpen} navItems={navItems} />
      <nav>
        <Drawer
          container={
            window !== undefined ? () => window().document.body : undefined
          }
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen((prevState) => !prevState)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box
            onClick={() => setMobileOpen((prevState) => !prevState)}
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h6" sx={{ my: 2 }}>
              Van Plaza
            </Typography>
            <Divider className="my-2" />
            <MenuDrawer setMobileOpen={setMobileOpen} navItems={navItems} />
            <Divider className="my-2" />
            {authUser?.email ? (
              <MenuDrawer setMobileOpen={setMobileOpen} navItems={authItems} />
            ) : (
              <Link className="mx-auto" href={"/signin"}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "darkblue !important",
                  }}
                >
                  Shign In / Create Account
                </Button>
              </Link>
            )}
          </Box>
        </Drawer>
      </nav>
      <div className="w-full place-items-center">
        <Toolbar />
        {children}
      </div>
    </Box>
  );
}

Main.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Main;
