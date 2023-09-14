import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import useStoreUser from "@/hooks/useStoreUser";
import AuthMenu from "./common_auth-menu";
import { Menu } from "@mui/icons-material";

const Header = ({ setMobileOpen, navItems }) => {
  const { authUser, sessionData, sessionStatus, authLoader, setAuthLoader } =
    useContext(AUTH_CONTEXT);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const [storingUser, setStoringUser] = useState(null);

  // const { dbConfirmation } = useStoreUser(storingUser);

  // useEffect(() => {
  //   if (dbConfirmation) {
  //     setStoringUser(null);
  //   }
  // }, [dbConfirmation]);

  // useEffect(() => {
  //   if (sessionData?.user) {
  //     console.log(sessionData?.user);
  //     setStoringUser({
  //       email: sessionData?.user?.email,
  //       userName: sessionData?.user?.name,
  //       profilePic: sessionData?.user?.image,
  //     });
  //   }
  // }, [sessionData]);

  return (
    <AppBar sx={{ boxShadow: "none" }} component="nav">
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
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
          }}
        >
          Van Plaza
        </Typography>
        <Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
          </Box>
          {authUser?.email ? (
            <>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <Avatar
                  alt={authUser?.userName}
                  src={`/uploads/images/users/${authUser?.profilePic}`}
                />
              </IconButton>
              <AuthMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                open={open}
              />
            </>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
