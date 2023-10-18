// import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  LocationOn,
  ArrowRight,
  EditLocationAlt,
  Done,
} from "@mui/icons-material";
import { Divider, List, ListItemButton } from "@mui/joy";
import {
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { postCodes } from "@/bangladeshGeojson/bd-postcodes";
import { divisions } from "@/bangladeshGeojson/bd-divisions";
import { districts } from "@/bangladeshGeojson/bd-districts";
import AutoSelect from "./common_auto-complete";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import usePlacesAutocomplete from "use-places-autocomplete";

export default function LocationSelectModal({
  selectedAddressBook,
  setSelectedAssressBook,
  content,
  state,
  toggleDrawer,
}) {
  const { authUser } = React.useContext(AUTH_CONTEXT);

  const authUserDefaultLocation = authUser?.locations?.find(
    (loc) => loc?.def == true
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  return (
    <div className="w-[95%] lg:w-[80%]">
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          {content}
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                height: "100vh",
              },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {!isLoaded ? (
              <p>Loading...</p>
            ) : (
              <Map
                toggleDrawer={toggleDrawer}
                anchor={anchor}
                selectedAddressBook={selectedAddressBook}
                setSelectedAssressBook={setSelectedAssressBook}
              />
            )}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

// const LocationSelectModal = ({
//   selectedAddressBook,
//   setSelectedAssressBook,
// }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
//     libraries: ["places"],
//   });

//   return (
//     <div>
//       <input
//         onClick={() => {
//           if (selectedAddressBook) {
//             setSelectedAssressBook(null);
//           } else {
//             console.log("Not Selected");
//           }
//         }}
//         type="checkbox"
//         id="locationSelectModal"
//         className="modal-toggle"
//       />
//       <div className="modal modal-bottom h-[100vh]">
//         <div className="modal-box p-0">
//           {!isLoaded ? (
//             <p>Loading...</p>
//           ) : (
//             <Map
//               selectedAddressBook={selectedAddressBook}
//               setSelectedAssressBook={setSelectedAssressBook}
//             />
//           )}
//         </div>
//         <label className="modal-backdrop" htmlFor="locationSelectModal">
//           Close
//         </label>
//       </div>
//     </div>
//   );
// };

// export default LocationSelectModal;

function Map({
  selectedAddressBook,
  setSelectedAssressBook,
  toggleDrawer,
  anchor,
}) {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [editing, setEditing] = useState(false);
  const { authUser } = useContext(AUTH_CONTEXT);
  const { pathname } = useRouter();

  const authUserDefaultLocation = authUser?.locations?.find(
    (loc) => loc?.def === true
  );

  return (
    <div className="flex flex-col lg:flex-col-reverse">
      {editing ? (
        <div>
          <EditLocation
            toggleDrawer={toggleDrawer}
            anchor={anchor}
            selectedAddressBook={selectedAddressBook}
            setEditing={setEditing}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
            setSelectedAssressBook={setSelectedAssressBook}
          />
        </div>
      ) : (
        <>
          <GoogleMap
            zoom={15}
            center={
              selectedPlace
                ? {
                    lat: parseFloat(selectedPlace?.lat),
                    lng: parseFloat(selectedPlace?.lng),
                  }
                : selectedAddressBook
                ? {
                    lat: selectedAddressBook?.Address?.lat,
                    lng: selectedAddressBook?.Address?.lng,
                  }
                : authUser?.locations?.length > 0
                ? {
                    lat: authUserDefaultLocation?.Address?.lat,
                    lng: authUserDefaultLocation?.Address?.lng,
                  }
                : center
            }
            mapContainerClassName="w-full h-[100vh]"
          >
            <Marker
              icon={<LocationOn />}
              position={
                selectedPlace
                  ? {
                      lat: parseFloat(selectedPlace?.lat),
                      lng: parseFloat(selectedPlace?.lng),
                    }
                  : selectedAddressBook
                  ? {
                      lat: selectedAddressBook?.Address?.lat,
                      lng: selectedAddressBook?.Address?.lng,
                    }
                  : authUser?.locations?.length > 0
                  ? {
                      lat: authUserDefaultLocation?.Address?.lat,
                      lng: authUserDefaultLocation?.Address?.lng,
                    }
                  : center
              }
            />
          </GoogleMap>
          <div className="w-full sticky bottom-0">
            <Button
              onClick={() => setEditing(true)}
              startIcon={<EditLocationAlt />}
              endIcon={<ArrowRight />}
              fullWidth
              className="bg-white text-black hover:bg-white"
            >
              {pathname === "/" || pathname === "/checkout"
                ? authUser?.locations?.length === 0
                  ? "Set a Default Delevery Location"
                  : "Change Default Location"
                : selectedAddressBook
                ? "Chane Location"
                : "Add New Location"}
            </Button>
            <Button
              onClick={toggleDrawer(anchor, false)}
              fullWidth
              className="bg-red-500 hover:bg-red-500 text-white hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function EditLocation({
  setSelectedPlace,
  selectedPlace,
  setEditing,
  selectedAddressBook,
  setSelectedAssressBook,
  toggleDrawer,
  anchor,
}) {
  const { authUser } = useContext(AUTH_CONTEXT);
  const { pathname } = useRouter();
  console.log(pathname);
  const [selectedLocation, setSelectedLocation] = useState({
    Region: "",
    City: "",
    Area: "",
    Address: "",
    LandMark: "",
    def: pathname === "/" || pathname === "/checkout" ? true : false,
  });
  const [activeStep, setActiveStep] = useState(0);

  const handleSetLocation = () => {
    console.log(selectedLocation);

    if (pathname === "/" || pathname === "/checkout") {
      fetch(`/api/store-user-default-location?email=${authUser?.email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedLocation),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            toast.success("Location set successfully");
            setEditing(false);
          }
        });
    } else if (selectedAddressBook) {
      fetch(`/api/edit-location?locationId=${selectedAddressBook?._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedLocation),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            toast.success("Location set successfully");
            setEditing(false);
            setSelectedAssressBook(null);
          }
        });
    } else {
      fetch(`/api/store-location?user=${authUser?.email}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedLocation),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            toast.success("Location set successfully");
            setEditing(false);
          }
        });
    }
  };

  useEffect(() => {
    setSelectedLocation((s) => {
      const newObj = { ...s };
      newObj.Address = selectedPlace;
      return newObj;
    });
  }, [selectedPlace]);

  return (
    <div className="h-screen">
      <div
        className={`p-5 bg-base-200 flex flex-col h-[100vh] ${
          activeStep === 3 && "flex-col-reverse"
        }`}
      >
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className="bg-white rounded-lg p-2 w-full"
        >
          {activeStep === 0 ? (
            <Step className="w-full">
              <StepLabel className="flex items-center justify-between font-bold w-full">
                <span className="font-bold text-black">Region</span>{" "}
                <span className="ml-5">
                  {
                    divisions?.divisions?.find(
                      (div) => div?.id == selectedLocation.Region
                    )?.name
                  }
                </span>
              </StepLabel>
              <StepContent className="text-opacity-50">
                Selecting bellow...
              </StepContent>
            </Step>
          ) : activeStep === 1 ? (
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className="bg-white rounded-lg p-2 w-full"
            >
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold text-black">Region</span>{" "}
                  <span className="ml-5">
                    {
                      divisions?.divisions?.find(
                        (div) => div?.id == selectedLocation.Region
                      )?.name
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">City</span>{" "}
                  <span className="ml-5">
                    {
                      districts?.districts?.find(
                        (dis) => dis?.id == selectedLocation.City
                      )?.name
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
            </Stepper>
          ) : activeStep === 2 ? (
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className="bg-white rounded-lg p-2 w-full"
            >
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold text-black">Region</span>{" "}
                  <span className="ml-5">
                    {
                      divisions?.divisions?.find(
                        (div) => div?.id == selectedLocation.Region
                      )?.name
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">City</span>{" "}
                  <span className="ml-5">
                    {
                      districts?.districts?.find(
                        (dis) => dis?.id == selectedLocation.City
                      )?.name
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">Area</span>{" "}
                  <span className="ml-5">
                    {
                      postCodes?.postcodes?.find(
                        (dis) => dis?.postCode == selectedLocation.Area
                      )?.upazila
                    }{" "}
                    -{" "}
                    {
                      postCodes?.postcodes?.find(
                        (dis) => dis?.postCode == selectedLocation.Area
                      )?.postOffice
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
            </Stepper>
          ) : activeStep === 3 ? (
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className="bg-white rounded-lg p-2 w-full"
            >
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold text-black">Region</span>{" "}
                  <span className="ml-5">
                    {
                      divisions?.divisions?.find(
                        (div) => div?.id == selectedLocation.Region
                      )?.name
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">City</span>{" "}
                  <span className="ml-5">
                    {
                      districts?.districts?.find(
                        (dis) => dis?.id == selectedLocation.City
                      )?.name
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">Area</span>{" "}
                  <span className="ml-5">
                    {
                      postCodes?.postcodes?.find(
                        (dis) => dis?.postCode == selectedLocation.Area
                      )?.upazila
                    }{" "}
                    -{" "}
                    {
                      postCodes?.postcodes?.find(
                        (dis) => dis?.postCode == selectedLocation.Area
                      )?.postOffice
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">Address</span>{" "}
                  <span className="ml-5">
                    {selectedLocation?.Address?.address}
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting above...
                </StepContent>
              </Step>
            </Stepper>
          ) : (
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className="bg-white rounded-lg p-2 w-full"
            >
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold text-black">Region</span>{" "}
                  <span className="ml-5">
                    {
                      divisions?.divisions?.find(
                        (div) => div?.id == selectedLocation.Region
                      )?.name
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">City</span>{" "}
                  <span className="ml-5">
                    {
                      districts?.districts?.find(
                        (dis) => dis?.id == selectedLocation.City
                      )?.name
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">Area</span>{" "}
                  <span className="ml-5">
                    {
                      postCodes?.postcodes?.find(
                        (dis) => dis?.postCode == selectedLocation.Area
                      )?.upazila
                    }{" "}
                    -{" "}
                    {
                      postCodes?.postcodes?.find(
                        (dis) => dis?.postCode == selectedLocation.Area
                      )?.postOffice
                    }
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">Address</span>{" "}
                  <span className="ml-5">
                    {selectedLocation?.Address?.address}
                  </span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting above...
                </StepContent>
              </Step>
              <Step className="w-full">
                <StepLabel className="flex items-center justify-between font-bold w-full">
                  <span className="font-bold">Land Mark</span>{" "}
                  <span className="ml-5">{selectedLocation?.LandMark}</span>
                </StepLabel>
                <StepContent className="text-opacity-50">
                  Selecting bellow...
                </StepContent>
              </Step>
            </Stepper>
          )}
        </Stepper>

        <p className="my-2 font-bold">
          Select {Object?.keys(selectedLocation)[activeStep]}
        </p>
        <List className="bg-white rounded-lg p-2 w-full overflow-y-scroll">
          {activeStep === 0 ? (
            divisions?.divisions?.map(({ id, name }) => {
              return (
                <ListItemButton
                  onClick={() => {
                    setSelectedLocation((s) => {
                      const newObj = { ...s };
                      newObj.Region = id;
                      return newObj;
                    });
                    setActiveStep(1);
                  }}
                  key={id}
                >
                  {name}
                </ListItemButton>
              );
            })
          ) : activeStep === 1 ? (
            districts?.districts?.map(
              ({ division_id, name, id, lat, long }) => {
                if (division_id === selectedLocation?.Region) {
                  return (
                    <ListItemButton
                      onClick={() => {
                        setSelectedLocation((s) => {
                          const newObj = { ...s };
                          newObj.City = id;
                          return newObj;
                        });
                        setSelectedPlace((old) => {
                          return {
                            address: old?.address,
                            lat: parseFloat(lat),
                            lng: parseFloat(long),
                          };
                        });
                        setActiveStep(2);
                      }}
                      key={id}
                    >
                      {name}
                    </ListItemButton>
                  );
                }
              }
            )
          ) : activeStep === 2 ? (
            postCodes?.postcodes.map(
              ({ division_id, district_id, upazila, postOffice, postCode }) => {
                if (
                  division_id === selectedLocation?.Region &&
                  district_id === selectedLocation?.City
                ) {
                  return (
                    <ListItemButton
                      onClick={() => {
                        setSelectedLocation((s) => {
                          const newObj = { ...s };
                          newObj.Area = postCode;
                          return newObj;
                        });
                        setActiveStep(3);
                      }}
                      key={postCode}
                    >
                      {upazila} - {postOffice}
                    </ListItemButton>
                  );
                }
              }
            )
          ) : activeStep === 3 ? (
            <div className="flex space-x-3 w-full">
              <PlacesAutoComplete
                setActiveStep={setActiveStep}
                setSelectedPlace={setSelectedPlace}
              />
              <IconButton
                disabled={!selectedPlace?.address}
                onClick={() => setActiveStep(4)}
                size="small"
                className="bg-success rounded-full"
              >
                <Done />
              </IconButton>
            </div>
          ) : (
            <TextField
              size="small"
              onChange={(e) => {
                setSelectedLocation((s) => {
                  const newObj = { ...s };
                  newObj.LandMark = e.target.value;
                  return newObj;
                });
              }}
              placeholder="Eg : Near the Orchid Hotel"
            />
          )}
          <ListItemButton></ListItemButton>
        </List>
        <div className="sticky bottom-0">
          <Button
            disabled={
              !selectedLocation?.Address ||
              !selectedLocation?.Area ||
              !selectedLocation?.City ||
              !selectedLocation?.LandMark ||
              !selectedLocation?.Region
            }
            onClick={handleSetLocation}
            fullWidth
            className="bg-[steelblue] text-white font-bold normal-case"
          >
            Confirm
          </Button>
          <Button
            onClick={toggleDrawer(anchor, false)}
            fullWidth
            className="bg-red-500 hover:bg-red-500 text-white hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
import Fuse from "fuse.js";
function PlacesAutoComplete({ setSelectedPlace, setActiveStep }) {
  const [places, setPlaces] = useState([]);
  const [query, setQuery] = useState("");

  const fuseOptions = {
    keys: ["place_name"], // Adjust this to the key in your data that you want to search
    threshold: 0.4, // Adjust the threshold as needed to control the fuzziness
  };

  const fuse = new Fuse([], fuseOptions);

  useEffect(() => {
    if (!query) {
      setPlaces([]);
    } else {
      fetch(
        `https://barikoi.xyz/v1/api/search/verify/autocomplete/${process.env.NEXT_PUBLIC_BARIKOI_API_KEY}/place?q=House%${query}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // const searchResults = fuse.search(data?.places);
          // setPlaces(searchResults.map((result) => result.item));
          setPlaces(data?.places);
        });
    }
  }, [query]);

  useEffect(() => {
    console.log("Places Before Update: ", places);
    fuse.setCollection(places);
    console.log("Places After Update: ", places);
  }, [places]);

  // const {
  //   ready,
  //   clearSuggestions,
  //   setValue,
  //   suggestions: { status, data },
  //   value,
  // } = usePlacesAutocomplete();

  // return (
  //   <div>
  //     <input
  //       onChange={(e) => setQuery(e.target.value)}
  //       type="text"
  //       className="input input-bordered w-full"
  //       placeholder="Search your location"
  //     />
  //     <div className="grid grid-cols-1 text-start">
  //       {places?.map(({ id, address, latitude, longitude }) => (
  //         <ListItemButton
  //           onClick={() =>
  //             setSelectedPlace({
  //               lat: parseFloat(latitude),
  //               lng: parseFloat(longitude),
  //               address: address,
  //             })
  //           }
  //           key={id}
  //           className="text-black font-bold text-start p-2"
  //         >
  //           <IconButton>
  //             <LocationOn />
  //           </IconButton>
  //           {address}
  //         </ListItemButton>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    // <div>Something</div>
    // <AutoSelect
    //   inputOnchange={(e) => setValue(e.target.value)}
    //   globalLabel={"description"}
    //   disabled={!ready}
    //   placeholder={"Search your address"}
    //   onChange={(event, newValue) => {
    //     setSelectedPlace({
    //       lat: parseFloat(newValue?.latitude),
    //       lng: parseFloat(newValue?.longitude),
    //       address: newValue?.address,
    //     });
    //     setActiveStep(4);
    //   }}
    //   size={"small"}
    //   options={data}
    // />
    <AutoSelect
      inputOnchange={(e) => {
        setQuery(e.target.value);
        setSelectedPlace((old) => {
          return { lat: old?.lat, lng: old?.lng, address: e.target.value };
        });
      }}
      fullWidth={true}
      globalLabel={"address"}
      startIcon={<LocationOn />}
      placeholder={"your address"}
      onChange={(event, newValue) => {
        setSelectedPlace({
          lat: parseFloat(newValue?.latitude),
          lng: parseFloat(newValue?.longitude),
          address: newValue?.address,
        });
        setActiveStep(4);
      }}
      size={"small"}
      options={places}
    />
  );
}
