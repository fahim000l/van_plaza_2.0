import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TextField, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import useBase64 from "@/hooks/useBase64";

const EditProfileModal = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const hiddenInput = useRef();
  const [convertingImage, setConvertingImage] = useState(null);
  const { convertedImg } = useBase64(convertingImage);

  const Formik = useFormik({
    initialValues: {
      profilePic: "",
      userName: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (convertedImg) {
      Formik.setValues("profilePic", convertedImg);
    }
  }, [convertedImg]);

  useEffect(() => {
    if (authUser) {
      Formik.setValues("profilePic", authUser?.profilePic);
      Formik.setValues("userName", authUser?.userName);
      Formik.setValues("phone", authUser?.phone);
    }
  }, [authUser]);

  useEffect(() => {
    console.log(Formik.values);
  }, [Formik]);

  return (
    <div>
      <input type="checkbox" id="editProfileModal" className="modal-toggle" />
      <div className="modal lg:modal-middle modal-bottom">
        <div className="modal-box w-full">
          <form className="w-full flex flex-col items-center">
            <input
              onChange={(e) => {
                setConvertingImage(e.target.files[0]);
              }}
              ref={hiddenInput}
              className="hidden"
              type="file"
            />
            <div
              onClick={() => hiddenInput.current.click()}
              className="cursor-pointer"
            >
              <Avatar
                sx={{ width: 150, height: 150 }}
                src={Formik.values.profilePic}
              />
            </div>
            {/* <div className="avatar mb-2">
              <div className="w-32 rounded">
                <img src={authUser?.profilePic} />
              </div>
            </div> */}
            <div>
              <TextField
                placeholder="Your Name"
                fullWidth
                name="userName"
                {...Formik.getFieldProps("userName")}
                className="my-2"
                size="small"
              />
              <TextField
                placeholder="Your Phone Number"
                fullWidth
                name="phone"
                {...Formik.getFieldProps("phone")}
                className="my-2"
                size="small"
              />
              <LoadingButton
                fullWidth
                size="small"
                className="bg-[steelblue] hover:bg-[steelblue] hover:text-white text-white"
              >
                Confirm
              </LoadingButton>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="editProfileModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default EditProfileModal;
