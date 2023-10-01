import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TextField, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import useBase64 from "@/hooks/useBase64";
import toast from "react-hot-toast";

const EditProfileModal = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const hiddenInput = useRef();
  const [convertingImage, setConvertingImage] = useState(null);
  const { convertedImg } = useBase64(convertingImage);
  const [editing, setEditing] = useState(false);
  const modalToggleButton = useRef();

  const Formik = useFormik({
    initialValues: {
      userName: authUser?.userName || "",
      phone: authUser?.phone || "",
      profilePic: authUser?.profilePic || "",
    },
    onSubmit: (values) => {
      setEditing(true);
      if (convertedImg) {
        values["profilePic"] = convertedImg;
      }
      console.log(values);

      fetch(`/api/edit-user-profile?email=${authUser?.email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data?.success) {
            toast.success("Profile modified successfully");
            setEditing(false);
            modalToggleButton.current.click();
          }
        });
    },
  });

  return (
    <div>
      <input
        ref={modalToggleButton}
        type="checkbox"
        id="editProfileModal"
        className="modal-toggle"
      />
      <div className="modal lg:modal-middle modal-bottom">
        <form onSubmit={Formik.handleSubmit} className="modal-box w-full">
          <div className="w-full flex flex-col items-center">
            <input
              name="profilePic"
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
                src={convertedImg || authUser?.profilePic}
              />
            </div>
            <div>
              <TextField
                onClick={(e) => (e.target.value = "")}
                placeholder="Your Name"
                fullWidth
                name="userName"
                className="my-2"
                size="small"
                required
                {...Formik.getFieldProps("userName")}
                // defaultValue={authUser?.userName}
              />
              <TextField
                onClick={(e) => (e.target.value = "")}
                placeholder="Your Phone Number"
                fullWidth
                name="phone"
                className="my-2"
                size="small"
                required
                {...Formik.getFieldProps("phone")}
                // defaultValue={authUser?.phone}
              />
              <LoadingButton
                fullWidth
                type="submit"
                size="small"
                className="bg-[steelblue] hover:bg-[steelblue] hover:text-white text-white"
              >
                Confirm
              </LoadingButton>
            </div>
          </div>
        </form>
        <label className="modal-backdrop" htmlFor="editProfileModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default EditProfileModal;
