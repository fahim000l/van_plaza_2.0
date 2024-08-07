import { Box, Button, Typography } from "@mui/material";
import BannerImage from "../public/home/BannerImage.png";
import Image from "next/image";
import React, { useContext, useRef } from "react";
import { ArrowRight, LocationOn } from "@mui/icons-material";
import LocationSelectModal from "./LocationSelectModal";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import logo from "../public/logo.png";
import Link from "next/link";
import TestComponent from "./TestComponent";

const HomeBanner = () => {
  const locationSelectModal = useRef();
  const { authUser } = useContext(AUTH_CONTEXT);

  const authUserDefaultLocation = authUser?.locations?.find(
    (loc) => loc?.def == true
  );

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box
      sx={{
        // clipPath: [
        //   "polygon(0% 0%, 100% 0%, 100% 90%,0% 100%)",
        //   "polygon(0% 0%, 100% 0%, 100% 90%,0% 100%)",
        //   "polygon(0% 0%, 100% 0%, 100% 80%,0% 100%)",
        // ],
        backgroundColor: "#222745",
        p: ["20px", "20px", "50px"],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: ["20px", "0px", "0px"],
        }}
      >
        <Box
          sx={{
            width: ["100%", "100%", "40%"],
            p: ["10px", "10px", "50px"],
            textAlign: "start",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: [2, 2, 5],
            color: "white",
          }}
        >
          <TestComponent />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Let’s Grow Your Brand To The Next Level
          </Typography>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            commodo ipsum duis laoreet maecenas. Feugiat
          </Typography>
          {!authUser?.email && (
            <Link href={"/create-account"}>
              <Button
                endIcon={<ArrowRight />}
                sx={{
                  width: ["100%", "100%", "50%"],
                  backgroundColor: "#C5ACED !important",
                  color: "black",
                }}
                variant="contained"
              >
                Get Started
              </Button>
            </Link>
          )}
        </Box>
        <Box sx={{ width: "40%", display: ["none", "none", "block"] }}>
          {/* <Image src={logo} width={550} height={550} /> */}
          <Image src={logo} className="h-64" />
          {/* <Image src={BannerImage} alt="Home Banner" /> */}
        </Box>
      </Box>
      <label
        ref={locationSelectModal}
        htmlFor="locationSelectModal"
        className="hidden"
      >
        Location Select Modal
      </label>
      {/* <Button
        onClick={() => locationSelectModal.current.click()}
        className="hover:bg-white bg-white hover:text-black text-black w-[95%] lg:w-[80%] mx-auto normal-case font-bold text-xs"
        startIcon={<LocationOn className="text-[steelblue]" />}
      >
        |{" "}
        {authUserDefaultLocation?.Address?.address.split(",")[0] ||
          "Select Your Location"}
      </Button> */}
      {authUser?.email && (
        <LocationSelectModal
          state={state}
          toggleDrawer={toggleDrawer}
          content={
            <Button
              fullWidth
              onClick={toggleDrawer("bottom", true)}
              className="hover:bg-white bg-white hover:text-black text-black mx-auto normal-case font-bold flex items-center justify-center"
              startIcon={<LocationOn className="text-[steelblue]" />}
            >
              <span>|</span>
              <span className="text-start mx-2 text-xs">
                {authUserDefaultLocation?.Address?.address ||
                  "Select Your Location"}
              </span>
            </Button>
          }
        />
      )}
    </Box>
  );
};

export default HomeBanner;
