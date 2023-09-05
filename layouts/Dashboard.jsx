import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuDrawer from "@/components/common_menu-drawer";
import {
  Add,
  Inventory,
  AddBusiness,
  CategoryOutlined,
  SquareFootOutlined,
  Hail,
} from "@mui/icons-material";
import { FaTshirt } from "react-icons/fa";

const drawerWidth = 240;

const navItems = [
  {
    path: "/dashboard/stock-in",
    content: "Stock In",
    icon: <AddBusiness />,
  },
  {
    path: "/stock-collection",
    content: "Stock Collection",
    icon: <Inventory />,
  },
  {
    path: "/dashboard/add-products/regular-image",
    content: "Add Product",
    icon: <Add />,
  },
  {
    path: "/dashboard/products-collection",
    content: "Products Collection",
    icon: <FaTshirt />,
  },
  {
    path: "/dashboard/suppliers-collection",
    content: "Suppliers",
    icon: <Hail />,
  },
  {
    path: "/dashboard/dashboard-categories",
    content: "Categories",
    icon: <CategoryOutlined />,
  },
  {
    path: "/dashboard/dashboard-sizes",
    content: "Sizes",
    icon: <SquareFootOutlined />,
  },
];

function Dashboard({ window, children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          <MenuDrawer setMobileOpen={setMobileOpen} navItems={navItems} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Box
            onClick={() => setMobileOpen((prevState) => !prevState)}
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h6" sx={{ my: 2 }}>
              Van Plaza
            </Typography>
            <Divider />
            <MenuDrawer setMobileOpen={setMobileOpen} navItems={navItems} />
          </Box>
        </Drawer>
      </Box>
      <div className="w-full place-items-center p-10">
        <Toolbar />
        {children}
      </div>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
