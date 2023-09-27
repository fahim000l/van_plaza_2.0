import PersonalProfile from "@/components/profile/PersonalProfile";
import Profile from "@/layouts/Profile";
import React from "react";

const ProfilePage = () => {
  return (
    <Profile>
      <PersonalProfile />
    </Profile>
  );
};

export default ProfilePage;
