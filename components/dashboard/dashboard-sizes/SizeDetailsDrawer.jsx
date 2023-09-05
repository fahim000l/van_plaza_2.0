import React, { useState } from "react";
import { Drawer, IconButton, Fab, Chip, Button } from "@mui/material";
import { Info } from "@mui/icons-material";
import ShowSizeAttr from "./ShowSizeAttr";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import useGetAllSizes from "@/hooks/useGetAllSizes";
import { Add } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const SizeDetailsDrawer = ({
  sizeAttributes,
  sizeName,
  categoryId,
  sizeId,
}) => {
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

  const [records, setRecords] = useState([...sizeAttributes]);

  const [editingAttr, setEditingAttr] = useState("");
  const { category } = useGetCategoryById(categoryId);
  const { sizesRefetch } = useGetAllSizes();

  const handleEdit = () => {
    fetch(`/api/edit-size-attr?sizeId=${sizeId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(records),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.modifiedCount > 0) {
          setEditingAttr("");
          sizesRefetch();
          toast.success(`Attr of Size Id : ${sizeId} modified successfully`);
        }
      });
  };

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
              <Button
                onClick={handleEdit}
                variant="contained"
                className="bg-[darkblue] mb-5"
              >
                Submit
              </Button>
              <div className="grid card bg-base-300 rounded-box place-items-center">
                <div className="overflow-x-auto mb-32">
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
                      {records?.map((record, i) => (
                        <ShowSizeAttr
                          i={i}
                          record={record}
                          setRecords={setRecords}
                          key={i}
                          editingAttr={editingAttr}
                          setEditingAttr={setEditingAttr}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <Fab
                  onClick={() => setRecords((r) => [...r, {}])}
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                  }}
                  size="small"
                  aria-label={"Add"}
                  color="primary"
                  className="bg-[darkblue]"
                >
                  <Add />
                </Fab>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SizeDetailsDrawer;
