import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useRef, useState } from "react";
import LocationCard from "./LocationCard";
import LocationSelectModal from "../LocationSelectModal";
import { Button } from "@mui/material";

const AddressBook = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  let locations;
  const [selectedAddressBook, setSelectedAssressBook] = useState(null);
  const locationSelectLabel = useRef();

  if (authUser && authUser.locations) {
    locations = authUser.locations;
  } else {
    locations = [];
  }

  console.log(locations);

  return (
    <div className="grid card bg-[steelblue] rounded-box p-5 my-2">
      <div className="flex justify-between mb-5">
        <label ref={locationSelectLabel} hidden htmlFor="locationSelectModal">
          locationSelectModal
        </label>
        <p className="font-bold text-white">Address Book</p>
        <Button
          onClick={() => locationSelectLabel.current.click()}
          className="hover:bg-white bg-white text-[steelblue] hover:text-[steelblue]"
        >
          Add new Location
        </Button>
      </div>
      <div className="flex space-x-2 items-start">
        {locations?.map((location) => (
          <LocationCard
            setSelectedAssressBook={setSelectedAssressBook}
            key={location?._id}
            location={location}
          />
        ))}
      </div>
      <LocationSelectModal
        setSelectedAssressBook={setSelectedAssressBook}
        selectedAddressBook={selectedAddressBook}
      />
    </div>
  );
};

export default AddressBook;
