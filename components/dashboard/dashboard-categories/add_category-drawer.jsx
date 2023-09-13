import React, { useRef, useState } from "react";
import {
  Box,
  Drawer,
  Button,
  Typography,
  Link,
  TextField,
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import useBase64 from "@/hooks/useBase64";

const AddCategoryDrawer = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [addedFile, setAddedFile] = useState(null);
  const { convertedImg } = useBase64(addedFile);
  const fileInputRef = useRef();
  const { categoriesRefetch } = useGetAllCategories();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    setAddedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    console.log(event?.dataTransfer?.files[0]);
    setAddedFile(event.target.files[0]);
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    const form = event.target;
    const categoryName = form.categoryName.value;
    const categoryImage = convertedImg;

    const categoryInfo = {
      categoryName,
      categoryImage,
    };

    fetch("/api/store-new-category", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(categoryInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          form.reset();
          setAddedFile(null);
          toggleDrawer("top", false);
          toast.success("New category added");
          categoriesRefetch();
        }
      });
  };

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            variant="contained"
            sx={{ backgroundColor: "darkblue !important", marginY: 2 }}
          >
            Add New Category
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              className="p-10"
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "& > img": {
                    width: ["100%", "100%", "600px"],
                    height: ["200px", "200px", "300px"],
                    borderRadius: "20px",
                    marginTop: "10px",
                  },
                }}
              >
                {convertedImg ? (
                  <img src={convertedImg} alt="" />
                ) : (
                  <AddPhotoAlternate
                    sx={{ fontSize: ["100px", "200px", "300px"] }}
                  />
                )}
                <Typography
                  className="text-center"
                  sx={{ fontSize: ["15px", "20px", "20px"] }}
                  variant="p"
                  color="black"
                >
                  Upload a{" "}
                  <span style={{ color: "steelblue", fontWeight: "bold" }}>
                    Category Image
                  </span>
                  <br />
                  <Link
                    component="button"
                    variant="body2"
                    sx={{ mx: "10px", color: "blue" }}
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                  >
                    Select from your device
                    <input
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      type="file"
                      style={{ display: "none" }}
                    />
                  </Link>
                  or, Simply drag and drop
                </Typography>
              </Box>
              {convertedImg && (
                <form
                  onSubmit={handleAddCategory}
                  className="flex justify-center mt-5"
                >
                  <TextField
                    name="categoryName"
                    className="w-full"
                    placeholder="Category Name"
                    variant="filled"
                  />
                  <Button
                    type="submit"
                    className="bg-[blue]"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </form>
              )}
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AddCategoryDrawer;
