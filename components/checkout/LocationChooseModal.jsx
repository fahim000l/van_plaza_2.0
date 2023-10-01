import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useRef } from "react";
import LocationCard from "../profile/LocationCard";

const LocationChooseModal = ({ setSelectedLocation }) => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const chooseModalToggleBtn = useRef();

  return (
    <div>
      <input
        ref={chooseModalToggleBtn}
        type="checkbox"
        id="chooseLocationModal"
        className="modal-toggle"
      />
      <div className="modal lg:modal-middle modal-bottom">
        <div className="modal-box p-2">
          <div className="grid grid-cols-1 gap-2">
            {authUser?.locations?.map((location) => (
              <LocationCard
                setChoosedLocation={setSelectedLocation}
                chooseModalToggleBtn={chooseModalToggleBtn}
                key={location?._id}
                location={location}
              />
            ))}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="chooseLocationModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default LocationChooseModal;
