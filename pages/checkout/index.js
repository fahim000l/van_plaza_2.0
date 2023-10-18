import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import Main from "@/layouts/Main";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Chip, Divider, Button, IconButton } from "@mui/material";
import useGetcartByUser from "@/hooks/useGetcartByUser";
import CheckOutCard from "@/components/checkout/CheckOutCard";
import { Edit, ArrowRight } from "@mui/icons-material";
import CheckOutFooter from "@/components/checkout/CheckOutFooter";
import LocationSelectModal from "@/components/LocationSelectModal";
import LocationChooseModal from "@/components/checkout/LocationChooseModal";
import EditProfileModal from "@/components/profile/EditProfileModal";

const CheckOutPage = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const { carts_user } = useGetcartByUser(authUser?.email);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const defaultLocation = authUser?.locations?.find((loc) => loc?.def === true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (defaultLocation) {
      setSelectedLocation(defaultLocation);
    }
  }, [defaultLocation]);

  const calculateItemsTotal = () => {
    return carts_user?.reduce((total, newValue) => {
      return (
        total +
        parseFloat(newValue?.qps?.[0]?.sps?.[0].sellPrice) *
          parseFloat(newValue?.quantity)
      );
    }, 0);
  };

  const deleveryFee = 100;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handlePlaceOrder = () => {
    setErrors([]);
    if (!authUser?.isVarified || !authUser?.phone || !selectedLocation) {
      if (!authUser?.isVarified) {
        setErrors((err) => [...err, "Please verify your email"]);
      }

      if (!authUser?.phone) {
        setErrors((err) => [...err, "Please add your contact number"]);
      }

      if (!selectedLocation) {
        setErrors((err) => [...err, "Please select a delevery location"]);
      }
    } else {
      fetch(`/api/store-order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user: authUser?.email,
          deleveryFee,
          location: selectedLocation,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.url) {
            location.replace(data?.url);
          }
        });
    }
  };

  return (
    <Main>
      <div className="lg:flex justify-evenly items-start lg:mx-10 my-5 mx-2">
        <div className="lg:w-[45%] my-5">
          <div className="space-y-2 lg:p-5 p-2 rounded-box shadow-xl">
            <div className="flex justify-between items-center">
              <p className="mr-2 font-bold">Delever to :</p>{" "}
              {/* <IconButton className="bg-blue-200 text-blue-500">
                <Edit />
              </IconButton> */}
            </div>
            <div className="flex items-center cursor-pointer">
              {" "}
              <div className="flex items-center">
                <Avatar src={authUser?.profilePic} />
                <div className="mx-2">{authUser?.userName}</div>
              </div>{" "}
            </div>
            <Divider />
            <div className="flex space-x-2 cursor-pointer items-center">
              {" "}
              <Chip size="small" color="info" label={"Email"} />{" "}
              <span>{authUser?.email}</span>
              <Chip
                color={authUser?.isVarified ? "success" : "error"}
                label={authUser?.isVarified ? "Varified" : "Varify Email"}
              />{" "}
            </div>
            <Divider />
            <label
              htmlFor={authUser?.locations?.length > 0 && "chooseLocationModal"}
              className="flex justify-between cursor-pointer"
            >
              {" "}
              <div className="flex space-x-2 items-center">
                <Chip size="small" color="info" label={"Location"} />{" "}
                <div>
                  {authUser?.locations?.length > 0 ? (
                    <span className="flex justify-between w-full">
                      {selectedLocation?.Address?.address}{" "}
                    </span>
                  ) : (
                    <LocationSelectModal
                      state={state}
                      toggleDrawer={toggleDrawer}
                      content={
                        <div
                          className="w-full"
                          onClick={toggleDrawer("bottom", true)}
                        >
                          <Chip color="error" label={"Set a location"} />
                        </div>
                      }
                    />
                    // <div>
                    //   <Chip color="error" label={"Set a delevery location"} />
                    // </div>
                  )}
                </div>
              </div>
              <ArrowRight />
            </label>
            <Divider />
            <label
              htmlFor="editProfileModal"
              className="flex justify-between cursor-pointer items-center"
            >
              {" "}
              <div className="flex space-x-2 items-center">
                <Chip size="small" color="info" label={"Contact"} />{" "}
                <div>
                  {authUser?.phone ? (
                    <span className="flex justify-between w-full">
                      {authUser?.phone}
                    </span>
                  ) : (
                    <div>
                      <Chip color="error" label={"Not set yet"} />
                    </div>
                  )}
                </div>
              </div>
              <ArrowRight />
            </label>
          </div>
          {carts_user?.map((cart) => (
            <CheckOutCard key={cart?._id} cart={cart} />
          ))}
        </div>
        <div className="rounded-lg shadow-lg bg-[steelblue] lg:w-[45%]">
          <Divider />
          <div className="bg-base-300 rounded-box lg:p-5 lg:m-5 p-2 m-2">
            <p className="flex items-center my-2 font-bold justify-between">
              <span>Ttems Total :</span>{" "}
              <Chip label={`${calculateItemsTotal()} /-`} />{" "}
            </p>
            <p className="flex items-center my-2 font-bold justify-between">
              <span>Delivery Charge :</span>{" "}
              <Chip label={`${deleveryFee} /-`} />
            </p>
            <p className="flex items-center my-2 font-bold justify-between">
              <span>Total :</span>{" "}
              <Chip
                label={`${parseFloat(calculateItemsTotal()) + deleveryFee} /-`}
              />
            </p>
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              className="bg-[steelblue] text-white hidden lg:inline"
            >
              Place Order
            </Button>
            <div className="my-2">
              {errors?.map((error) => (
                <p className="text-red-600 font-bold">* {error}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CheckOutFooter
        deleveryFee={deleveryFee}
        calculateItemsTotal={calculateItemsTotal}
      />
      <LocationChooseModal setSelectedLocation={setSelectedLocation} />
      {authUser && <EditProfileModal />}
    </Main>
  );
};

export default CheckOutPage;
