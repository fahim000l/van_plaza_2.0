import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useRef, useState } from "react";
import LocationCard from "./LocationCard";
import LocationSelectModal from "../LocationSelectModal";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "../common_dlt_confirmation-dialog";

const AddressBook = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  let locations;
  const [selectedAddressBook, setSelectedAssressBook] = useState(null);
  const locationSelectLabel = useRef();
  const [deletingLocation, setDeletingLocation] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (authUser && authUser.locations) {
    locations = authUser.locations;
  } else {
    locations = [];
  }

  const handleDeleteLocation = () => {
    fetch(`/api/delete-location?locationId=${deletingLocation?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          toast.success("Location removed successfully");
          setDeletingLocation(null);
          setDeleteOpen(false);
        }
      });
  };

  return (
    <div className="grid card bg-[steelblue] rounded-box p-5 my-2">
      <div className="flex justify-between mb-5">
        <label ref={locationSelectLabel} hidden htmlFor="locationSelectModal">
          locationSelectModal
        </label>
        <p className="font-bold text-white">Address Book</p>
        <Button
          size="small"
          disabled={locations?.length === 3}
          onClick={() => locationSelectLabel.current.click()}
          className="hover:bg-white bg-white text-[steelblue] hover:text-[steelblue]"
        >
          Add new Location
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
        {locations?.map((location) => (
          <LocationCard
            setDeleteOpen={setDeleteOpen}
            setDeletingLocation={setDeletingLocation}
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
      <DeleteConfirmationDialog
        actionFunction={handleDeleteLocation}
        confirmMessage={"Are you sure to delete this location ?"}
        confirmTitle={"Confirmation to Delete the location"}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />
    </div>
  );
};

export default AddressBook;
