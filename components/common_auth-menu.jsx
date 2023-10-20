import React, { useContext } from "react";
import { Menu, MenuItem, ListItemIcon, Avatar, Divider } from "@mui/material";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import Link from "next/link";

const AuthMenu = ({ anchorEl, setAnchorEl, open }) => {
  const { authUser, setAuthLoader, signingOut } = useContext(AUTH_CONTEXT);

  const handleLogOut = () => {
    setAuthLoader(true);
    signingOut();
    setAnchorEl(null);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Link href={"/profile"}>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon sx={{ mr: 2 }}>
            <Avatar alt={authUser?.userName} src={authUser?.profilePic} />
          </ListItemIcon>
          Profile
        </MenuItem>
      </Link>
      {authUser?.role === "admin" && (
        <Link href={"/dashboard/stock-in"}>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon sx={{ mr: 2 }}>
              <Avatar alt={authUser?.userName} src={authUser?.profilePic} />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        </Link>
      )}
      <Divider />
      <MenuItem onClick={handleLogOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default AuthMenu;
