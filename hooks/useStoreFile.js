import { useEffect, useState } from "react";

const useStoreFile = (file) => {
  const [uploadConfirmation, setUploadConfirmation] = useState(null);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    console.log(status);
    if (file && status) {
      const formData = new FormData();
      formData.append("upload", file);

      fetch("/api/store-file", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setUploadConfirmation(data);
        });
    }
  }, [file, status]);

  return { uploadConfirmation, status, setStatus };
};

export default useStoreFile;
