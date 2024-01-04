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

const PsDetailsBottomNav = ({ setSelectedProduct, ps }) => {
  const [value, setValue] = useState("/");
  const { authUser } = useContext(AUTH_CONTEXT);
  const { push } = useRouter();

  return (
    <div className="btm-nav z-[900] lg:hidden border-2 border-solid border-b-0 border-r-0 border-l-0 border-gray-500 h-12 bg-base-200">
      <button onClick={() => push("/shop")} className="text-xs">
        <Shop2 />
        <span className="btm-nav-label">Shop</span>
      </button>
      <button>
        <label
          //   variant="contained"
          //   size="sm"
          onClick={() => {
            if (authUser?.email) {
              setSelectedProduct(ps?.[0]);
            } else {
              push("/signin");
            }
          }}
          htmlFor="sizeSelectModal"
          className="btn btn-primary btn-sm normal-case"
        >
          Add to Cart
        </label>
      </button>
    </div>
  );
};

export default PsDetailsBottomNav;
