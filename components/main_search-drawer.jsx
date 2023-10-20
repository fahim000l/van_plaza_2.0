import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Search, Backspace } from "@mui/icons-material";
import { IconButton, Button, TextField } from "@mui/material";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import AutoSelect from "./common_auto-complete";
import { useRouter } from "next/router";

export default function SearchDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { categories } = useGetAllCategories("");
  const [searchItems, setSearchItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const backSpaceBtn = React.useRef();
  const { push } = useRouter();

  const handleSearch = (event) => {
    if (event.target.value) {
      setSearchItems(
        categories?.filter((category) =>
          category?.categoryName
            ?.toLowerCase()
            ?.includes(event.target.value.toLowerCase())
        )
      );
    } else setSearchItems([]);
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <TextField
            onClick={toggleDrawer(anchor, true)}
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
          <Drawer
            anchor={anchor}
            sx={{ width: "100%" }}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="flex items-center space-x-2 mt-2 w-screen p-1 lg:p-5">
              <IconButton
                size="small"
                ref={backSpaceBtn}
                onClick={toggleDrawer(anchor, false)}
              >
                <Backspace />
              </IconButton>
              <AutoSelect
                inputOnchange={(e) => setSearchValue(e.target.value)}
                size={"small"}
                placeholder={"Search product / category"}
                startIcon={<Search />}
                globalLabel={"categoryName"}
                fullWidth={true}
                onChange={(event, newValue) =>
                  push(`/category/${newValue?._id}`)
                }
                options={categories}
              />
              <IconButton
                size="small"
                onClick={(anchor) => {
                  push(`/search/${searchValue}`);
                  backSpaceBtn.current.click();
                }}
              >
                <Search />
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
                    color: "black",
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
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
