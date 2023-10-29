import BottomNav from "@/components/main_bottom_nav";
import ProfileNav from "@/components/profile/ProfileNav";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import { Button } from "@mui/joy";
import Link from "next/link";
import React, { useContext } from "react";
import loader from "../public/logo.png";
import Image from "next/image";

const Profile = ({ children }) => {
  const { authLoader, dbUserLoading } = useContext(AUTH_CONTEXT);

  if (authLoader || dbUserLoading) {
    return <Image className="w-full h-screen" src={loader} alt="" />;
  }

  return (
    <div>
      <ProfileNav />
      <div className="drawer lg:drawer-open">
        <input id="profileDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          {/* <div className="h-[100vh]"> */}
          {/* <div className="lg:p-10 p-2"></div> */}
          <div className="min-h-screen lg:m-10 m-2 bg-[#F6F4FF]">
            {children}
          </div>
          <BottomNav />
          {/* </div> */}
        </div>
        <div className="drawer-side z-[300]">
          <label htmlFor="profileDrawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 min-h-full bg-base-200 text-base-content space-y-5">
            {/* Sidebar content here */}
            <li>
              <a
                href="#personalProfile"
                className="bg-[#222745] text-white hover:bg-[#222745] hover:text-white"
              >
                Personal Profile
              </a>
            </li>
            <li>
              <a
                href="#addressBook"
                className="bg-[#222745] text-white hover:bg-[#222745] hover:text-white"
              >
                Address Book
              </a>
            </li>
            <li>
              <a
                href="#myOrders"
                className="bg-[#222745] text-white hover:bg-[#222745] hover:text-white"
              >
                My Orders
              </a>
            </li>
            <li>
              <Link href={"/"}>
                {" "}
                <button>Back to home</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
