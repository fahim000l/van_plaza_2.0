import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { Avatar, Chip } from "@mui/material";
import React, { useContext } from "react";
import { Menu } from "@mui/icons-material";

const ProfileNav = () => {
  const { authUser } = useContext(AUTH_CONTEXT);

  return (
    <div className="navbar bg-[#222745] space-x-2 sticky top-0 z-[300]">
      <div className="flex-none gap-2">
        <label htmlFor="profileDrawer" className="text-white lg:hidden">
          <Menu />
        </label>
      </div>
      <div className="w-full flex items-center justify-center space-x-2">
        <div>
          <Avatar src={authUser?.profilePic} />
        </div>
        <div>
          <p className="text-white font-bold text-xl">{authUser?.userName}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
