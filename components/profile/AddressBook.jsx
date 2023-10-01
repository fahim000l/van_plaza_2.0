import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useRef, useState } from "react";
import LocationCard from "./LocationCard";
import LocationSelectModal from "../LocationSelectModal";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { AddLocation } from "@mui/icons-material";
import DeleteConfirmationDialog from "../common_dlt_confirmation-dialog";
import { IconButton } from "@mui/joy";

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
    <div className="grid card bg-[steelblue] rounded-box p-5 my-2">
      <div className="flex justify-between mb-5">
        <label ref={locationSelectLabel} hidden htmlFor="locationSelectModal">
          locationSelectModal
        </label>
        <p className="font-bold text-white">Address Book</p>
        <LocationSelectModal
          state={state}
          toggleDrawer={toggleDrawer}
          content={
            <div className="w-full flex items-end justify-end">
              <IconButton
                onClick={toggleDrawer("bottom", true)}
                size="sm"
                className="lg:hidden bg-white text-[steelblue]"
              >
                <AddLocation />
              </IconButton>
              <Button
                size="small"
                startIcon={<AddLocation />}
                disabled={locations?.length === 3}
                onClick={toggleDrawer("bottom", true)}
                className="hover:bg-white bg-white text-[steelblue] hidden lg:flex hover:text-[steelblue]"
              >
                Add new Location
              </Button>
            </div>
          }
        />
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
