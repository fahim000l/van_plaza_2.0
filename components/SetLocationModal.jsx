import React from "react";

const SetLocationModal = () => {
  return (
    <div>
      <input type="checkbox" id="setLocationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
        </div>
        <label className="modal-backdrop" htmlFor="setLocationModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default SetLocationModal;
