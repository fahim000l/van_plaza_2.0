import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { Avatar, Chip } from "@mui/material";
import React, { useContext } from "react";
import { Menu } from "@mui/icons-material";

const ProfileNav = () => {
  const { authUser } = useContext(AUTH_CONTEXT);

  return (
    <div className="navbar bg-[steelblue] space-x-2">
      <div className="flex-none gap-2">
        <Avatar src={authUser?.profilePic} />
      </div>
      <div className="flex-1">
        <p className="text-white font-bold text-xl">{authUser?.userName}</p>
      </div>

      <div className="flex-none gap-2">
        <label htmlFor="profileDrawer" className="text-white lg:hidden">
          <Menu />
        </label>
      </div>
    </div>
  );
};

export default ProfileNav;
