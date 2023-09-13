import * as React from "react";
import { Box, Card, CardCover, CardContent, Typography } from "@mui/joy";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Link from "next/link";

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
    <Link href={"/categories"} className="cursor-pointer">
      <Box sx={BoxStyle}>
        <Card sx={{ minHeight: "180px", width: 220 }}>
          <CardCover>
            <img src={categoryImage} alt="" />
          </CardCover>
          <CardCover
            sx={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
            }}
          />
          <CardContent sx={{ justifyContent: "flex-end" }}>
            <Typography level="title-lg" textColor="#fff">
              {categoryName}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
}
