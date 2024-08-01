import React, { useRef } from "react";

const TestComponent = () => {
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Do something with the captured image file
      console.log("Captured file:", file);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      capture="environment"
      ref={fileInputRef}
      // style={{ display: 'none' }}
      onChange={handleFileChange}
    />
  );
};

export default TestComponent;
