import React, { useRef } from "react";
import { LocationOn, Delete } from "@mui/icons-material";
import { divisions } from "@/bangladeshGeojson/bd-divisions";
import { districts } from "@/bangladeshGeojson/bd-districts";
import { postCodes } from "@/bangladeshGeojson/bd-postcodes";
import { IconButton } from "@mui/material";

const LocationCard = ({ location, setSelectedAssressBook }) => {
  const {
    Address: { address },
    Region,
    City,
    Area,
    LandMark,
    def,
  } = location;
  const locationSelectModalLabel = useRef();

  return (
    <div className="card lg:w-96 h-auto bg-base-100 shadow-xl my-2 lg:my-0">
      <label
        // onClick={() => setSelectedAssressBook(location)}
        ref={locationSelectModalLabel}
        className="hidden"
        htmlFor="locationSelectModal"
      >
        Something
      </label>
      <div
        onClick={() => {
          locationSelectModalLabel.current.click();
          setSelectedAssressBook(location);
        }}
        className="card-body p-2 cursor-pointer"
      >
        <div className="flex items-start">
          <LocationOn sx={{ color: "steelblue" }} />
          <div className="text-xs lg:text-sm">
            <h2 className="font-bold text-[steelblue]">{address}</h2>

            {def === true && (
              <span className="text-center font-bold text-green-500">
                || Default Delevery Location
              </span>
            )}
            <div className="space-x-2">
              {divisions?.divisions?.find((div) => div?.id === Region)?.name} -
              {districts?.districts?.find((dis) => dis?.id === City)?.name} -
              {
                postCodes?.postcodes?.find((post) => post?.postCode === Area)
                  ?.upazila
              }
              -
              {
                postCodes?.postcodes?.find((post) => post?.postCode === Area)
                  ?.postOffice
              }
              -{LandMark}
            </div>
          </div>
          <div>
            <IconButton className="bg-red-200 text-[red]">
              <Delete />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
