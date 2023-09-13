import { useEffect, useState } from "react";

const useBase64 = (file) => {
  const [convertedImg, setConvertedImg] = useState("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(reader.result);
        setConvertedImg(reader?.result);
      };

      reader.onerror = (err) => {
        console.log({ message: "Base64 convertin failed", err });
      };
    }
  }, [file]);

  return { convertedImg };
};

export default useBase64;
