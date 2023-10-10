import AddressBook from "@/components/profile/AddressBook";
import MyOrders from "@/components/profile/MyOrders";
import PersonalProfile from "@/components/profile/PersonalProfile";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import Profile from "@/layouts/Profile";
import React, { useContext } from "react";

const ProfilePage = () => {
  const { authUser } = useContext(AUTH_CONTEXT);

  return (
    <Profile>
      <PersonalProfile />
      <AddressBook />
      {authUser?.ops?.length > 0 && <MyOrders />}
    </Profile>
  );
};

export default ProfilePage;
