import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Typography } from "@mui/joy";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductCard = ({ sp, setSelectedProduct }) => {
  const [images, setImages] = useState([]);
  const { push } = useRouter();
  const {
    _id,
    sellPrice,
    qps,
    products: { [0]: product },
  } = sp;

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

  const handleMainDivClick = (event) => {
    const isButtonClicked = event.target.closest(".addToCartBtn") !== null;

    if (!isButtonClicked) {
      console.log({ success: true });
    } else {
      sizeSelectModal.current.click();
    }
  };

  const sizeSelectModal = useRef();

  const totalQpsQuantity = qps?.reduce((total, qp) => {
    return total + parseInt(qp?.quantity);
  }, 0);

  if (totalQpsQuantity !== 0) {
    return (
      <div
        className="cursor-pointer flex flex-col items-center justify-center p-1 lg:p-2 tooltip"
        data-tip={product?.productName}
      >
        <Card
          sx={{ padding: [1, 2, 2], borderRadius: "10px 10px 0px 0px" }}
          variant="outlined"
        >
          <Box onClick={() => push(`/shop/${_id}`)} sx={{ maxWidth: 400 }}>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images?.map((step, index) => (
                <div key={index}>
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
          </Box>
          <div className="flex flex-col justify-between">
            <div>
              {/* <marquee className="font-bold" behavior="" direction="">
                {product?.productName}
              </marquee> */}
              <p className="font-bold">
                {product?.productName?.length > 12
                  ? product?.productName?.slice(0, 12) + "..."
                  : product?.productName}
              </p>
              <p className="font-bold text-[steelblue]">{sellPrice}/-</p>
            </div>
          </div>
          <label ref={sizeSelectModal} hidden htmlFor="sizeSelectModal">
            Size Select Modal
          </label>
        </Card>
        <Button
          fullWidth
          onClick={() => {
            sizeSelectModal.current.click();
            setSelectedProduct(sp);
          }}
          sx={{ borderRadius: "0px 0px 10px 10px" }}
          id="addToCartBtn"
          endDecorator={<AddShoppingCart />}
          className="bg-[steelblue] text-white hover:bg-[blue] text-xs"
          size="sm"
        >
          Add To Cart
        </Button>
      </div>
    );
  }
};

export default ProductCard;
