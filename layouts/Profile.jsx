import BottomNav from "@/components/main_bottom_nav";
import ProfileNav from "@/components/profile/ProfileNav";
import React from "react";

const Profile = ({ children }) => {
  return (
    <div>
      <ProfileNav />
      <div className="drawer lg:drawer-open">
        <input id="profileDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="lg:p-10 p-2 h-[100vh]">{children}</div>
          <BottomNav />
        </div>
        <div className="drawer-side">
          <label htmlFor="profileDrawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 min-h-full bg-base-200 text-base-content space-y-5">
            {/* Sidebar content here */}
            <li>
              <a className="bg-[steelblue] text-white hover:bg-[steelblue] hover:text-white">
                Personal Profile
              </a>
            </li>
            <li>
              <a className="bg-[steelblue] text-white hover:bg-[steelblue] hover:text-white">
                Address Book
              </a>
            </li>
            <li>
              <a className="bg-[steelblue] text-white hover:bg-[steelblue] hover:text-white">
                My Orders
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
