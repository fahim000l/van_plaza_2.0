import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext, useRef } from "react";
import { Avatar, Chip, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import EditProfileModal from "./EditProfileModal";

const PersonalProfile = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const editProfileModalLabel = useRef();

  return (
    <div className="grid card bg-[steelblue] rounded-box p-5 my-2">
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
          <p>{authUser?.email}</p>
          {authUser?.phone ? (
            <p>
              Phone :{" "}
              <Chip size="small" color="success" label={authUser?.phone} />
            </p>
          ) : (
            <p>
              Phone : <Chip size="small" color="error" label={"Not set yet"} />
            </p>
          )}
        </div>
      </div>
      {authUser && <EditProfileModal />}
    </div>
  );
};

export default PersonalProfile;
