import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useRef } from "react";
import { Avatar, Chip, Button } from "@mui/material";
import { Edit, Logout } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import EditProfileModal from "./EditProfileModal";
// import { hash } from "bcrypt";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const PersonalProfile = () => {
  const { authUser, signingOut, setAuthLoader } = useContext(AUTH_CONTEXT);

  const handleLogOut = () => {
    setAuthLoader(true);
    signingOut();
  };

  const editProfileModalLabel = useRef();
  const { pathname } = useRouter();

  const handleVarifyEmail = async () => {
    const emailToken = process.env.NEXT_PUBLIC_EMAIL_TOKEN;
    if (!authUser?.isVarified) {
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sub: "Please varify your email",
          to: authUser?.email,
          text: `<div>
              <p>
                Please 
                <a
                  href=${process.env.NEXT_PUBLIC_PROJECT_URL}api/verify-email?emailToken=${authUser?.emailToken}&email=${authUser?.email}&path=${pathname}
                >
                  Click Here
                </a>
                to verify your email
              </p>
            </div>`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            Swal.fire("Please Check your email inbox or span");
          }
        });
    }
  };

  return (
    <div
      id="personalProfile"
      className="grid card bg-[#222745] rounded-box p-5 my-2"
    >
      <div className="flex justify-between mb-5">
        <p className="font-bold text-white">Personal Profile</p>
        <IconButton
          onClick={() => editProfileModalLabel.current.click()}
          size="sm"
          className="lg:hidden bg-white text-[steelblue]"
        >
          <Edit />
        </IconButton>
        <label
          ref={editProfileModalLabel}
          htmlFor="editProfileModal"
          className="btn hidden"
        >
          open modal
        </label>
        <Button
          onClick={() => editProfileModalLabel.current.click()}
          size="small"
          startIcon={<Edit />}
          className="hover:bg-white bg-white text-[steelblue] hidden lg:flex hover:text-[steelblue]"
        >
          Edit Profile
        </Button>
      </div>
      <div className="flex space-x-2 items-start text-white">
        <Avatar
          sx={{ width: [40, 20, 56], height: [40, "", 56] }}
          src={authUser?.profilePic}
        />
        <div>
          <p className="lg:text-3xl text-xl">{authUser?.userName}</p>
          <p>
            <span>{authUser?.email}</span>{" "}
            <Chip
              size="small"
              onClick={handleVarifyEmail}
              className="cursor-pointer"
              color={authUser?.isVarified ? "success" : "error"}
              label={authUser?.isVarified ? "Varified" : "Not Varified"}
            />{" "}
          </p>
          {authUser?.phone ? (
            <p>
              Phone :{" "}
              <Chip size="small" color="success" label={authUser?.phone} />
            </p>
          ) : (
            <p>
              Phone :{" "}
              <Chip
                onClick={() => editProfileModalLabel.current.click()}
                className="cursor-pointer"
                size="small"
                color="error"
                label={"Not set yet"}
              />
            </p>
          )}
          <Button
            onClick={handleLogOut}
            size="small"
            color="error"
            variant="contained"
            className="bg-red-700 font-bold mt-5"
            startIcon={<Logout />}
          >
            Log Out
          </Button>
        </div>
      </div>
      {authUser && <EditProfileModal />}
    </div>
  );
};

export default PersonalProfile;
