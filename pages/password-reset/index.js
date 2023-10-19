import Main from "@/layouts/Main";
import React from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const PasswordReset = () => {
  return (
    <Main>
      <div className="h-screen w-full flex items-center justify-center lg:px-10">
        <form className="flex flex-col space-y-3 rounded-lg border-base-300 shadow-2xl p-5 shadow-[blue] w-full">
          <p>Reset your password</p>
          <TextField fullWidth label={"Email"} size="small" />
          <TextField fullWidth label={"New Password"} size="small" />
          <TextField fullWidth label={"Confirm New Password"} size="small" />
          <LoadingButton
            variant="contained"
            className="my-2 bg-[steelblue] text-white"
          >
            Confirm
          </LoadingButton>
        </form>
      </div>
    </Main>
  );
};

export default PasswordReset;
