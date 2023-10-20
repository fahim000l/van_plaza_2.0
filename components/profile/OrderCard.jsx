import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Image from "next/image";
import Link from "next/link";

export default function OrderCard({ op }) {
  const {
    orderInfo: {
      [0]: { date, transId },
    },
    qpInfo: {
      [0]: {
        psInfo: {
          [0]: {
            sellPrice,
            productInfo: {
              [0]: { standardImage, productName },
            },
          },
        },
      },
    },
  } = op;

  const [flex, setFlex] = React.useState(true);
  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ boxShadow: "none", overflow: "auto" }}
    >
      {/* <AspectRatio ratio="21/9" flex={flex} sx={{ flexBasis: 200 }}> */}
      <img src={standardImage} className="w-20" />
      {/* </AspectRatio> */}
      <CardContent>
        <Typography level="body-xs">{date}</Typography>
        <Typography level="title-lg" component="div">
          {productName?.split("-")[0]}
        </Typography>
        <Typography level="body-lg">{sellPrice} /-</Typography>
        <CardActions buttonFlex="none">
          <Link href={`/payment?transId=${transId}`}>
            <Button variant="outlined" color="neutral" size="sm">
              See details
            </Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
}
