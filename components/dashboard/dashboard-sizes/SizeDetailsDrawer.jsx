import React, { useState } from "react";
import { Drawer, IconButton, Avatar, Chip } from "@mui/material";
import { Info } from "@mui/icons-material";
import ShowSizeAttr from "./ShowSizeAttr";
import useGetCategoryById from "@/hooks/useGetCategoryById";

const SizeDetailsDrawer = ({ sizeAttributes, sizeName, categoryId }) => {
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

  const [editingAttr, setEditingAttr] = useState(null);
  const { category } = useGetCategoryById(categoryId);

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            className="bg-info text-[blue]"
          >
            <Info />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="flex flex-col w-full border-opacity-50 p-5">
              <div className="grid card bg-base-300 rounded-box p-5">
                <div className="flex items-center">
                  Size Name :{" "}
                  <Chip color="primary" className="ml-2" label={sizeName} />
                </div>
                <div className="flex items-center">
                  Category :{" "}
                  <div className="flex items-center ml-2 my-2">
                    <div className="avatar mr-2">
                      <div className="w-8 rounded">
                        <img
                          src={`/uploads/images/categories/${category?.categoryImage}`}
                          alt={category?.categoryName}
                        />
                      </div>
                    </div>
                    <Chip
                      color="primary"
                      className="ml-2"
                      label={category?.categoryName}
                    />
                  </div>
                </div>
              </div>
              <div className="divider" />
              <div className="grid card bg-base-300 rounded-box place-items-center">
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Measurement</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeAttributes?.map((attr, i) => (
                        <ShowSizeAttr
                          attr={attr}
                          key={i}
                          editingAttr={editingAttr}
                          setEditingAttr={setEditingAttr}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SizeDetailsDrawer;
