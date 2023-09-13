import React, { useContext, useEffect, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import AddProducts from "@/layouts/AddProducts";
import { ADD_PRODUCT_CONTEXT } from "@/contexts/AddProductProvider";
import useBase64 from "@/hooks/useBase64";

const imageBBKey = "0da7b12465383dcb076500d38fa41a41";

const StandardImage = () => {
  const { standardImage, setStandardImage } = useContext(ADD_PRODUCT_CONTEXT);
  const fileInputRef = useRef();

  const [convertingFile, setConvertingFile] = useState(null);
  const { convertedImg } = useBase64(convertingFile);

  useEffect(() => {
    if (convertedImg) {
      setStandardImage(convertedImg);
    }
  }, [convertedImg]);

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    setConvertingFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    console.log(event?.dataTransfer?.files[0]);
    setConvertingFile(event?.dataTransfer?.files[0]);
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
          {standardImage ? (
            <img src={standardImage} alt="" />
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
              standard Image
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

export default StandardImage;
