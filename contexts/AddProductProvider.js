import React, { createContext, useRef, useState } from "react";

export const ADD_PRODUCT_CONTEXT = createContext();

const AddProductProvider = ({ children }) => {
  const [standardImage, setStandardImage] = useState("");
  const [standardImgFile, setStandardImgFile] = useState(null);
  const [detailedImage, setDetailedImage] = useState("");
  const [detailedImgFile, setDetailedImgFile] = useState(null);
  const [regularImage, setRegularImage] = useState("");
  const [regularImgFile, setRegularImgFile] = useState(null);

  const addProductInfo = {
    standardImage,
    standardImgFile,
    detailedImage,
    detailedImgFile,
    regularImage,
    regularImgFile,
    setStandardImage,
    setStandardImgFile,
    setDetailedImage,
    setDetailedImgFile,
    setRegularImage,
    setRegularImgFile,
  };

  return (
    <ADD_PRODUCT_CONTEXT.Provider value={addProductInfo}>
      {children}
    </ADD_PRODUCT_CONTEXT.Provider>
  );
};

export default AddProductProvider;
