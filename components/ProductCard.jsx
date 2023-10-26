import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Typography } from "@mui/joy";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import Link from "next/link";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductCard = ({ sp, setSelectedProduct }) => {
  const { authUser } = useContext(AUTH_CONTEXT);

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
    if (product?.productName) {
      return (
        <div
          className="cursor-pointer flex flex-col items-center justify-center p-1 lg:p-2 tooltip"
          data-tip={product?.productName?.split("-")[0]}
        >
          <Card
            onClick={() => push(`/shop/${_id}`)}
            sx={{
              padding: [1, 2, 2],
              width: "100%",
              borderRadius: "10px 10px 0px 0px",
              backgroundColor: "",
            }}
            variant="outlined"
          >
            <Box>
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
                <p className="font-bold">
                  {product?.productName?.split("-")[0]?.length > 12
                    ? product?.productName?.slice(0, 12)?.split("-")[0] + "..."
                    : product?.productName?.split("-")[0]}
                </p>
                <p className="font-bold text-[steelblue]">{sellPrice}/-</p>
              </div>
            </div>
          </Card>
          <div className="w-full">
            {authUser?.email ? (
              <label
                onClick={() => setSelectedProduct(sp)}
                style={{ borderRadius: "0px 0px 10px 10px" }}
                className="bg-[#222745] text-white w-full normal-case py-1 flex items-center justify-center space-x-5 font-bold cursor-pointer text-sm"
                htmlFor="sizeSelectModal"
              >
                <span>Add To Cart</span>
                <AddShoppingCart />
              </label>
            ) : (
              <Link href={"/signin"}>
                <button
                  style={{ borderRadius: "0px 0px 10px 10px" }}
                  className="bg-[#222745] text-white w-full normal-case py-1 flex items-center justify-center space-x-5 font-bold cursor-pointer text-sm"
                  htmlFor="sizeSelectModal"
                >
                  <span>Add To Cart</span>
                  <AddShoppingCart />
                </button>
              </Link>
            )}
          </div>
        </div>
      );
    }
  }
};

export default ProductCard;
