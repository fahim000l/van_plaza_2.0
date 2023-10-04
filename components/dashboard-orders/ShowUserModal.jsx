import React from "react";
import { Avatar } from "@mui/material";

const ShowUserModal = ({ user }) => {
  console.log(user);

  const { email, phone, profilePic, userName } = user;

  return (
    <div>
      <input type="checkbox" id="showUserModal" className="modal-toggle" />
      <div className="modal lg:modal-middle modal-bottom">
        <div className="modal-box w-full">
          <div className="w-full flex flex-col items-center">
            <div className="cursor-pointer">
              <Avatar sx={{ width: 150, height: 150 }} src={profilePic} />
            </div>
            <div>
              <p className="text-3xl font-bold">{userName}</p>
              <p>Email : {email}</p>
              <p>Phone : {phone}</p>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="showUserModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default ShowUserModal;
