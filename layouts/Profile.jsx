import BottomNav from "@/components/main_bottom_nav";
import ProfileNav from "@/components/profile/ProfileNav";
import { Button } from "@mui/joy";
import Link from "next/link";
import React from "react";

const Profile = ({ children }) => {
  return (
    <div>
      <ProfileNav />
      <div className="drawer lg:drawer-open">
        <input id="profileDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          {/* <div className="h-[100vh]"> */}
          {/* <div className="lg:p-10 p-2"></div> */}
          <div className="min-h-screen lg:m-10 m-2">{children}</div>
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
                className="bg-[steelblue] text-white hover:bg-[steelblue] hover:text-white"
              >
                Personal Profile
              </a>
            </li>
            <li>
              <a
                href="#addressBook"
                className="bg-[steelblue] text-white hover:bg-[steelblue] hover:text-white"
              >
                Address Book
              </a>
            </li>
            <li>
              <a
                href="#myOrders"
                className="bg-[steelblue] text-white hover:bg-[steelblue] hover:text-white"
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
