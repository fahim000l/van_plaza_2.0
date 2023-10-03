import React from "react";
import LocationCard from "../profile/LocationCard";

const ShowLocationModal = ({ location }) => {
  return (
    <div>
      <input type="checkbox" id="showLocationModal" className="modal-toggle" />
      <div className="modal lg:modal-middle modal-bottom">
        <div className="modal-box p-2">
          <div className="grid grid-cols-1 gap-2">
            <LocationCard location={location} />
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="showLocationModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default ShowLocationModal;
