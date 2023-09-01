import {
  ListItemText,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
  ListItemIcon,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const MenuDrawer = ({ navItems, setMobileOpen }) => {
  return (
    <List>
      {navItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.content} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default MenuDrawer;
