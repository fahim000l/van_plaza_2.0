import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { Avatar, Divider } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import {
  Restore,
  Favorite,
  LocationOn,
  Home,
  Shop2,
  ShoppingCart,
  AddShoppingCartSharp,
} from "@mui/icons-material";

const PsDetailsBottomNav = ({ sizeSelectModal }) => {
  const [value, setValue] = useState("/");
  const { authUser } = useContext(AUTH_CONTEXT);
  const { push } = useRouter();

  return (
    <div className="btm-nav z-[200]">
      <button onClick={() => push("/shop")} className="active">
        <Shop2 />
        <span className="btm-nav-label">Shop</span>
      </button>
      <button className="active">
        <label
          onClick={() => sizeSelectModal.current.click()}
          //   variant="contained"
          //   size="sm"
          htmlFor="sizeSelectModal"
          className="btn btn-primary"
        >
          Add to Cart
        </label>
      </button>
    </div>
  );
};

export default PsDetailsBottomNav;
