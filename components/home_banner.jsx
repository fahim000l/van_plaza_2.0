import { Box, Button, Typography } from "@mui/material";
import BannerImage from "../public/home/BannerImage.png";
import Image from "next/image";
import React from "react";
import { ArrowRight } from "@mui/icons-material";

const HomeBanner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "steelblue",
        p: ["0px", "0px", "50px"],
        clipPath: [
          "polygon(0% 0%, 100% 0%, 100% 90%,0% 100%)",
          "polygon(0% 0%, 100% 0%, 100% 90%,0% 100%)",
          "polygon(0% 0%, 100% 0%, 100% 80%,0% 100%)",
        ],
      }}
    >
      <Box
        sx={{
          width: ["100%", "100%", "40%"],
          p: "50px",
          textAlign: "start",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: [2, 2, 5],
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Let’s Grow Your Brand To The Next Level
        </Typography>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus commodo
          ipsum duis laoreet maecenas. Feugiat
        </Typography>
        <Button
          endIcon={<ArrowRight />}
          sx={{
            width: ["100%", "100%", "50%"],
            backgroundColor: "darkblue !important",
          }}
          variant="contained"
        >
          Get Started
        </Button>
      </Box>
      <Box sx={{ width: "40%", display: ["none", "none", "block"] }}>
        <Image width={550} height={550} src={BannerImage} alt="Home Banner" />
      </Box>
    </Box>
  );
};

export default HomeBanner;
