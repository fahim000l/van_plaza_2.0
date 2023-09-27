import BottomNav from "@/components/main_bottom_nav";
import ProfileNav from "@/components/profile/ProfileNav";
import React from "react";

const Profile = ({ children }) => {
  return (
    <div>
      <ProfileNav />
      <div className="drawer lg:drawer-open drawer-end">
        <input id="profileDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          {children}
          <BottomNav />
        </div>
        <div className="drawer-side">
          <label htmlFor="profileDrawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
