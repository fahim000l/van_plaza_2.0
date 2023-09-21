import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { LocationOn } from "@mui/icons-material";

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
        <div className="modal-box">
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
  const [selectedPlace, setSelectedPlace] = useState();

  return (
    <>
      <div>
        <PlacesAutoComplete selectedPlace={selectedPlace} />
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-full h-[60vh]"
      >
        <Marker icon={<LocationOn />} position={center} />
      </GoogleMap>
    </>
  );
}

function PlacesAutoComplete({ selectedPlace }) {
  const {
    ready,
    value,
    setValue,
    clearSuggestions,
    suggestions: { status, data },
  } = usePlacesAutocomplete();

  return (
    <Combobox>
      <ComboboxInput
        value={value}
        disabled={!ready}
        className="input input-border"
        placeholder="Search Your Location"
        onChange={(event) => setValue(event.target.value)}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data?.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
