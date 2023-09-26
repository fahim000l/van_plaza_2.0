// import React, { useEffect, useRef, useState } from "react";
// import * as maptilersdk from "@maptiler/sdk";
// import { Country, State, City, ICity } from "country-state-city";
// import { divisions } from "@/bangladesh-geojson/bd-divisions";
// import { districts } from "@/bangladesh-geojson/bd-districts";
// import { upoZilas } from "@/bangladesh-geojson/bd-upazilas";
// import { postCodes } from "@/bangladesh-geojson/bd-postcodes";
// import AutoSelect from "./common_auto-complete";

// const LocationSelectModal = () => {
//   console.log(divisions);
//   console.log(districts?.districts?.filter((dis) => dis?.division_id === "2"));
//   console.log(upoZilas?.upazilas?.filter((upo) => upo?.district_id === "43"));
//   console.log(
//     postCodes?.postcodes?.filter((post) => post?.upazila === "Chittagong Sadar")
//   );

//   const [places, setPlaces] = useState(null);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     if (query) {
//       fetch(
//         `https://barikoi.xyz/v1/api/search/verify/autocomplete/bkoi_b98a765d5bf3797e9d766f55da7ff932774f2886d7059c6b889be5aa2e547b12/place?q=House%${query}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           setPlaces(data?.places);
//         });
//     } else {
//       setPlaces(null);
//     }
//   }, [query]);

//   return (
//     <div>
//       <input
//         type="checkbox"
//         id="locationSelectModal"
//         className="modal-toggle"
//       />
//       <div className="modal modal-bottom">
//         <div className="modal-box p-0">
//           <input
//             onChange={(e) => setQuery(e.target.value)}
//             type="text"
//             className="input input-border"
//           />
//           <div>
//             {places?.map((place) => (
//               <p>{place?.address}</p>
//             ))}
//           </div>
//         </div>
//         <label className="modal-backdrop" htmlFor="locationSelectModal">
//           Close
//         </label>
//       </div>
//     </div>
//   );
// };

// export default LocationSelectModal;

import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";
import { LocationOn, ArrowRight, EditLocationAlt } from "@mui/icons-material";
import { Divider, List, ListItemButton } from "@mui/joy";
import {
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { useFormik } from "formik";
import { postCodes } from "@/bangladesh-geojson/bd-postcodes";
import { divisions } from "@/bangladesh-geojson/bd-divisions";
import { districts } from "@/bangladesh-geojson/bd-districts";

const LocationSelectModal = ({ setLocationModal }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  return (
    <div>
      <input
        type="checkbox"
        id="locationSelectModal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom">
        <div className="modal-box p-0">
          {!isLoaded ? <p>Loading...</p> : <Map />}
        </div>
        <label className="modal-backdrop" htmlFor="locationSelectModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default LocationSelectModal;

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="flex flex-col lg:flex-col-reverse">
      <EditLocation />
      {/* <GoogleMap
        zoom={15}
        center={selectedPlace || center}
        mapContainerClassName="w-full h-[50vh]"
      >
        <Marker icon={<LocationOn />} position={selectedPlace || center} />
      </GoogleMap>
      <div className="w-full">
        <PlacesAutoComplete setSelectedPlace={setSelectedPlace} />
        <Button
          onClick={() => setLocationModal?.current?.click()}
          startIcon={<EditLocationAlt />}
          endIcon={<ArrowRight />}
          fullWidth
          className="bg-white text-black hover:bg-white"
        >
          Chane Location
        </Button>
      </div> */}
    </div>
  );
}

function EditLocation() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [selectedLocation, setSelectedLocation] = useState({
    Region: "",
    City: "",
    Area: "",
  });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="p-5 bg-base-200">
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
          </Stepper>
        )}
      </Stepper>

      <p className="my-2 font-bold">Select {selectedLocation.Region}</p>
      <List className="bg-white rounded-lg p-2 w-full">
        {activeStep === 0
          ? divisions?.divisions?.map(({ id, name }) => {
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
          : activeStep === 1
          ? districts?.districts?.map(({ division_id, name, id }) => {
              if (division_id === selectedLocation?.Region) {
                return (
                  <ListItemButton
                    onClick={() => {
                      setSelectedLocation((s) => {
                        const newObj = { ...s };
                        newObj.City = id;
                        return newObj;
                      });
                      setActiveStep(2);
                    }}
                    key={id}
                  >
                    {name}
                  </ListItemButton>
                );
              }
            })
          : postCodes?.postcodes.map(
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
            )}
        <ListItemButton></ListItemButton>
      </List>
    </div>
  );
}

function PlacesAutoComplete({ setSelectedPlace }) {
  const [places, setPlaces] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) {
      setPlaces([]);
    } else {
      fetch(
        `https://barikoi.xyz/v1/api/search/verify/autocomplete/bkoi_b98a765d5bf3797e9d766f55da7ff932774f2886d7059c6b889be5aa2e547b12/place?q=House%${query}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPlaces(data?.places);
        });
    }
  }, [query]);

  return (
    <div>
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="input input-border w-full"
        placeholder="Search your location"
      />
      <div className="grid grid-cols-1 text-start">
        {places?.map(({ id, address, latitude, longitude }) => (
          <ListItemButton
            onClick={() =>
              setSelectedPlace({
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
              })
            }
            key={id}
            className="text-black font-bold text-start p-2"
          >
            <IconButton>
              <LocationOn />
            </IconButton>
            {address}
          </ListItemButton>
        ))}
      </div>
    </div>
  );

  return (
    <Combobox>
      <ComboboxInput
        className="input input-border w-full"
        placeholder="Search Your Location"
        onChange={(event) => setQuery(event.target.value)}
      />
      <ComboboxPopover className="bg-white text-black relative z-[200]">
        <ComboboxList>
          {places?.map(({ address }, i) => (
            <ComboboxOption key={i} value={address} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
