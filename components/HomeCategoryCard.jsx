import * as React from "react";
import { Box, Card, CardCover, AspectRatio, Typography } from "@mui/joy";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Link from "next/link";
import Image from "next/image";

const BoxStyle = {
  perspective: "1000px",
  transition: "transform 0.4s",
  "& > div, & > div > div": {
    transition: "inherit",
  },
  "&:hover": {
    "& > div": {
      transform: "rotateY(30deg)",
      "& > div:nth-child(2)": {
        transform: "scaleY(0.9) translate3d(20px, 30px, 40px)",
      },
      "& > div:nth-child(3)": {
        transform: "translate3d(45px, 50px, 40px)",
      },
    },
  },
};

export default function HomeCategoryCard({ category }) {
  const { categoryName, categoryImage } = category;

  return (
    <Card variant="outlined">
      {/* <AspectRatio> */}
      <div>
        <img src={categoryImage} className="w-full h-20 lg:h-40" alt="" />
      </div>
      {/* </AspectRatio> */}
      <div>
        <Typography level="title-md">{categoryName}</Typography>
        {/* <Typography level="body-sm">Description of the card.</Typography> */}
      </div>
    </Card>
  );
}
