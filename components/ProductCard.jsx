import React, { useEffect, useState } from "react";
import { AspectRatio, Card, Typography } from "@mui/joy";
import { Image } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductCard = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.standardImage) {
      setImages((image) => [
        ...image,
        {
          label: "Standard Image",
          imgPath: product?.standardImage,
        },
      ]);
    }

    if (product?.regularImage) {
      setImages((image) => [
        ...image,
        {
          label: "Regular Image",
          imgPath: product?.regularImage,
        },
      ]);
    }

    if (product?.detailedImage) {
      setImages((image) => [
        ...image,
        {
          label: "Detailed Image",
          imgPath: product?.detailedImage,
        },
      ]);
    }
  }, [product]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Card variant="outlined">
      {/* <AspectRatio> */}
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        {/* <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>{images?.[activeStep]?.label}</Typography>
        </Paper> */}
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images?.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: [100, 150, 150],
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        {/* <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        /> */}
      </Box>
      {/* </AspectRatio> */}
      <div>
        <Typography level="title-md">Title</Typography>
        <Typography level="body-sm">Description of the card.</Typography>
      </div>
    </Card>
  );
};

export default ProductCard;
