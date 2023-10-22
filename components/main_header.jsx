import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  TextField,
  Backdrop,
} from "@mui/material";
import Link from "next/link";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import useStoreUser from "@/hooks/useStoreUser";
import AuthMenu from "./common_auth-menu";
import { Menu, Search, ShoppingCart, Backspace } from "@mui/icons-material";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import CartDrawer from "./CartDrawer";
import { useRouter } from "next/router";
import SearchDrawer from "./main_search-drawer";

const Header = ({ setMobileOpen, navItems }) => {
  const { authUser, sessionData, sessionStatus, authLoader, setAuthLoader } =
    useContext(AUTH_CONTEXT);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { categories } = useGetAllCategories();
  const { products } = useGetAllProducts();
  const [searchItems, setSearchItems] = useState([]);
  const [backDropOpen, setBackDropOpen] = React.useState(false);
  const backDropInput = useRef();
  const { pathname } = useRouter();

  const handleSearch = (event) => {
    if (event.target.value) {
      setSearchItems([
        ...categories?.filter((category) =>
          category?.categoryName
            ?.toLowerCase()
            ?.includes(event.target.value.toLowerCase())
        ),
      ]);
    } else setSearchItems([]);
  };

  return (
    <AppBar
      className="flex justify-between"
      sx={{ boxShadow: "none" }}
      component="nav"
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "steelblue",
        }}
      >
        <IconButton
          aria-label="open drawer"
          edge="start"
          className="text-white font-bold"
          onClick={() => setMobileOpen((prevState) => !prevState)}
          sx={{ display: ["block", "block", "none"] }}
        >
          <Menu />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "white",
            width: "20%",
            flexGrow: 1,
            display: ["none", "none", "block"],
          }}
        >
          Van Plaza
        </Typography>
        {(pathname === "/" ||
          pathname === "/shop" ||
          pathname?.includes("/search")) && (
          <div className="lg:w-[35%] md:w-full w-full">
            <SearchDrawer />
          </div>
        )}
        <Box sx={{ display: ["none", "none", "flex"], alignItems: "center" }}>
          {navItems.map((item) => (
            <Link href={item.path} key={item.path}>
              <Button
                startIcon={item.icon}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  mx: "10px",
                }}
              >
                {item.content}
              </Button>
            </Link>
          ))}
          {authUser?.email ? (
            <div className="flex items-center">
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <Avatar alt={authUser?.userName} src={authUser?.profilePic} />
              </IconButton>
              <AuthMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                open={open}
              />
            </div>
          ) : (
            <Link href={"/signin"}>
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
        {authUser?.email && (
          <IconButton
            size="small"
            className={`${pathname === "/payment" && "hidden"}`}
          >
            <CartDrawer />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
