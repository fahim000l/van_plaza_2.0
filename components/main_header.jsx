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
        <div className="lg:w-[35%] md:w-full w-full">
          <TextField
            onClick={() => {
              backDropInput.current.click();
              setBackDropOpen(true);
            }}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
            placeholder="Search Category"
            size="small"
            className="bg-white rounded-lg w-full"
          />
          <Backdrop
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={backDropOpen}
          >
            <div className="flex items-start mt-2 w-full">
              <TextField
                onChange={handleSearch}
                ref={backDropInput}
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <Search />
                    </IconButton>
                  ),
                }}
                placeholder="Search Category"
                size="small"
                className="bg-white rounded-lg w-full"
              />
              <IconButton
                onClick={() => setBackDropOpen(false)}
                className="text-white"
              >
                <Backspace />
              </IconButton>
            </div>
            <div className="bg-white text-black w-full">
              {searchItems?.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    "& > img": { mr: 2, flexShrink: 0 },
                    display: "flex",
                    padding: 1,
                  }}
                  // {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={item?.categoryImage || item?.standardImage}
                    alt=""
                  />
                  {item?.categoryName || item?.productName}
                </Box>
              ))}
            </div>
          </Backdrop>
        </div>
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
          <IconButton>
            <CartDrawer />
          </IconButton>
        )}
        {/* <IconButton className="text-white">
          <ShoppingCart />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
