import React, { useContext } from "react";
import { Menu, MenuItem, ListItemIcon, Avatar, Divider } from "@mui/material";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import Link from "next/link";

const AuthMenu = ({ anchorEl, setAnchorEl, open }) => {
  const { authUser, setAuthLoader } = useContext(AUTH_CONTEXT);

  const handleLogOut = () => {
    setAuthLoader(true);
    signOut();
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
      <MenuItem onClick={() => setAnchorEl(null)}>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem onClick={() => setAnchorEl(null)}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
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
