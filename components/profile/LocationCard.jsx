import React, { useContext, useRef } from "react";
import { LocationOn, Delete } from "@mui/icons-material";
import { divisions } from "@/bangladeshGeojson/bd-divisions";
import { districts } from "@/bangladeshGeojson/bd-districts";
import { postCodes } from "@/bangladeshGeojson/bd-postcodes";
import { IconButton } from "@mui/material";
import { Button } from "@mui/joy";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import LocationSelectModal from "../LocationSelectModal";
import { useRouter } from "next/router";

const LocationCard = ({
  location,
  setSelectedAssressBook,
  setDeleteOpen,
  setDeletingLocation,
  setChoosedLocation,
  chooseModalToggleBtn,
}) => {
  const {
    Address: { address },
    Region,
    City,
    Area,
    LandMark,
    def,
    _id,
  } = location;
  const locationSelectModalLabel = useRef();
  const { authUser } = useContext(AUTH_CONTEXT);

  const handleMakeDefault = () => {
    fetch(
      `/api/set-default-location?user=${authUser?.email}&locationId=${_id}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

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

  const { pathname } = useRouter();

  return (
    <div className="card h-auto bg-base-100 shadow-xl my-2 lg:my-0">
      <label
        // onClick={() => setSelectedAssressBook(location)}
        ref={locationSelectModalLabel}
        className="hidden"
        htmlFor="locationSelectModal"
      >
        Something
      </label>
      <div className="card-body p-2 cursor-pointer">
        <div
          onClick={() => {
            if (pathname === "/checkout") {
              setChoosedLocation(location);
              chooseModalToggleBtn.current.click();
            }
          }}
          className="flex items-start"
        >
          <LocationOn sx={{ color: "steelblue" }} />
          <LocationSelectModal
            selectedAddressBook={location}
            state={state}
            toggleDrawer={toggleDrawer}
            content={
              <div
                // onClick={() => {
                //   // locationSelectModalLabel.current.click();
                //   // setSelectedAssressBook(location);
                //   toggleDrawer("bottom", true);
                // }}
                onClick={toggleDrawer(
                  "bottom",
                  pathname === "/checkout" ? false : true
                )}
                className="text-xs lg:text-sm"
              >
                <h2 className="font-bold text-[steelblue]">{address}</h2>

                {def === true && (
                  <span className="text-center font-bold text-green-500">
                    || Default Delevery Location
                  </span>
                )}
                <div>
                  <div className="space-x-2">
                    {
                      divisions?.divisions?.find((div) => div?.id === Region)
                        ?.name
                    }{" "}
                    -
                    {
                      districts?.districts?.find((dis) => dis?.id === City)
                        ?.name
                    }{" "}
                    -
                    {
                      postCodes?.postcodes?.find(
                        (post) => post?.postCode === Area
                      )?.upazila
                    }
                    -
                    {
                      postCodes?.postcodes?.find(
                        (post) => post?.postCode === Area
                      )?.postOffice
                    }
                    -{LandMark}
                  </div>
                </div>
              </div>
            }
          />
          {pathname !== "/checkout" && (
            <div>
              <IconButton
                onClick={() => {
                  setDeleteOpen(true);
                  setDeletingLocation(location);
                }}
                size="small"
                className="bg-red-200 text-[red]"
              >
                <Delete />
              </IconButton>
            </div>
          )}
        </div>
        {def != true && (
          <Button
            onClick={handleMakeDefault}
            size="sm"
            className="bg-[green] text-white mt-2"
          >
            Set as Default Delevery Location
          </Button>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
