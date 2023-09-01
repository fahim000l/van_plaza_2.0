import React, { useContext, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import AddProducts from "@/layouts/AddProducts";
import { ADD_PRODUCT_CONTEXT } from "@/contexts/AddProductProvider";
import dynamic from "next/dynamic";
// const { ADD_PRODUCT_CONTEXT } = dynamic(() =>
//   import("@/contexts/AddProductProvider", {
//     ssr: false,
//   })
// );

const RegularImage = () => {
  const { regularImage, setRegularImage, setRegularImgFile } =
    useContext(ADD_PRODUCT_CONTEXT);
  const fileInputRef = useRef();

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    setRegularImgFile(event.target.files[0]);
    setRegularImage(URL.createObjectURL(fileInputRef.current.files[0]));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    console.log(event?.dataTransfer?.files[0]);
    setRegularImgFile(event?.dataTransfer?.files[0]);
    setRegularImage(URL.createObjectURL(event?.dataTransfer?.files[0]));
  };

  return (
    <AddProducts>
      <div onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
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
          {regularImage ? (
            <img src={regularImage} alt="" />
          ) : (
            <AddPhotoAlternateIcon
              sx={{ fontSize: ["100px", "200px", "300px"] }}
            />
          )}
          <Typography
            sx={{ fontSize: ["15px", "20px", "20px"] }}
            variant="p"
            color="black"
          >
            Upload a{" "}
            <span style={{ color: "steelblue", fontWeight: "bold" }}>
              regular Image
            </span>{" "}
            of your product.
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
      </div>
    </AddProducts>
  );
};

export default RegularImage;
