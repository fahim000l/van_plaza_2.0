import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import React, { useContext } from "react";
import { Avatar, Chip } from "@mui/material";

const PersonalProfile = () => {
  const { authUser } = useContext(AUTH_CONTEXT);

  return (
    <div className="grid card bg-[steelblue] text-white rounded-box p-5 my-2">
      <p className="font-bold mb-5">Personal Profile</p>
      <div className="flex space-x-2 items-start">
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
    </div>
  );
};

export default PersonalProfile;
