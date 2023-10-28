import React, { useContext, useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Restore,
  Favorite,
  LocationOn,
  Home,
  Shop2,
  ShoppingCart,
} from "@mui/icons-material";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { Avatar, Divider } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomNav = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const { push, pathname } = useRouter();
  const [value, setValue] = useState(pathname);
  return (
    <div
      // className="btm-nav"
      hidden={pathname?.includes("/shop/") || pathname?.includes("/checkout")}
      className="sticky bottom-0 lg:hidden z-[300]"
    >
      <Divider />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          push(newValue);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction value={"/"} label="Home" icon={<Home />} />
        <BottomNavigationAction value={"/shop"} label="Shop" icon={<Shop2 />} />
        <BottomNavigationAction
          value={"/profile"}
          label="Profile"
          icon={<Avatar size="sm" src={authUser?.profilePic} />}
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomNav;
