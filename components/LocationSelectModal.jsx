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
import usePlacesAutocomplete from "use-places-autocomplete";
import { LocationOn } from "@mui/icons-material";
import AutoSelect from "./common_auto-complete";
import { Button, IconButton, ListItemButton } from "@mui/joy";

const LocationSelectModal = () => {
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
    <>
      <div className="w-full">
        <PlacesAutoComplete setSelectedPlace={setSelectedPlace} />
      </div>
      <GoogleMap
        zoom={10}
        center={selectedPlace || center}
        mapContainerClassName="w-full h-[50vh]"
      >
        <Marker icon={<LocationOn />} position={selectedPlace || center} />
      </GoogleMap>
    </>
  );
}

function PlacesAutoComplete({ setSelectedPlace }) {
  const [places, setPlaces] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(
      `https://barikoi.xyz/v1/api/search/verify/autocomplete/bkoi_b98a765d5bf3797e9d766f55da7ff932774f2886d7059c6b889be5aa2e547b12/place?q=House%${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlaces(data?.places);
      });
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
