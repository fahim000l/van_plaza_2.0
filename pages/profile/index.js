import AddressBook from "@/components/profile/AddressBook";
import PersonalProfile from "@/components/profile/PersonalProfile";
import Profile from "@/layouts/Profile";
import React from "react";

const ProfilePage = () => {
  return (
    <Profile>
      <PersonalProfile />
      <AddressBook />
    </Profile>
  );
};

export default ProfilePage;
