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
import { PersonAdd, Settings, Logout, Shop2 } from "@mui/icons-material";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import BottomNav from "@/components/main_bottom_nav";
import loader from "../public/logo.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

const drawerWidth = 240;
const navItems = [
  {
    path: "/",
    content: "Home",
    icon: <Home />,
  },
  {
    path: "/shop",
    content: "Shop",
    icon: <Shop2 />,
  },
  {
    path: "/contact-us",
    content: "Contact Us",
    icon: <Mail />,
  },
];

const authItems = [
  {
    path: "/profile",
    content: "Profile",
    icon: <Avatar />,
  },
  {
    path: "/contact-us",
    content: (
      <Button
        variant="contained"
        onClick={() => signOut()}
        className="bg-[#222745] hover:bg-[#222745] text-white"
      >
        Log Out
      </Button>
    ),
    icon: <Logout />,
  },
];

function Main({ window, children }) {
  const { authUser, authLoader, dbUserLoading } =
    React.useContext(AUTH_CONTEXT);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (authLoader || dbUserLoading) {
    return <Image className="w-full h-screen" src={loader} alt="" />;
  }

  return (
    <Box>
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
                    backgroundColor: "#C5ACED !important",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Shign In / Create Account
                </Button>
              </Link>
            )}
          </Box>
        </Drawer>
      </nav>
      <div className="w-full place-items-center min-h-screen bg-[#F6F4FF]">
        <Toolbar />
        {children}
      </div>
      <BottomNav />
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
