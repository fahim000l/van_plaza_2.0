import Main from "@/layouts/Main";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const PasswordReset = () => {
  const {
    query: { email },
    push,
  } = useRouter();
  const [loader, setLoader] = useState(false);

  const Formik = useFormik({
    initialValues: {
      password: "",
      cPassword: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must contain at least 8 characters";
      }

      if (!values.cPassword) {
        errors.cPassword = "Password is required";
      } else if (values.password !== values.cPassword) {
        errors.cPassword = "Password did not matched";
        errors.password = "Password did not matched";
      } else if (values.cPassword.length < 8) {
        errors.cPassword = "Password must contain at least 8 characters";
      }

      return errors;
    },
    onSubmit: (values) => {
      setLoader(true);
      fetch(`/api/reset-password`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password: values.password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            setLoader(false);
            Swal.fire("Your passwor id reset", "Proceed to Login");
            push("/signin");
          }
        });
    },
  });

  return (
    <Main>
      <div className="h-screen w-full flex items-center justify-center lg:px-10">
        {email && (
          <form
            onSubmit={Formik.handleSubmit}
            className="flex flex-col space-y-3 rounded-lg border-base-300 shadow-2xl p-5 shadow-[blue] w-full"
          >
            <p>Reset your password</p>
            <TextField
              autoFocus={true}
              value={email}
              fullWidth
              label={"Email"}
              size="small"
            />
            <TextField
              fullWidth
              label={"New Password"}
              {...Formik.getFieldProps("password")}
              error={Formik.errors.password}
              helperText={Formik.errors.password}
              size="small"
            />
            <TextField
              fullWidth
              label={"Confirm New Password"}
              {...Formik.getFieldProps("cPassword")}
              error={Formik.errors.cPassword}
              helperText={Formik.errors.cPassword}
              size="small"
            />
            <LoadingButton
              type="submit"
              loading={loader}
              variant="contained"
              className="my-2 bg-[steelblue] text-white"
            >
              Confirm
            </LoadingButton>
          </form>
        )}
      </div>
    </Main>
  );
};

export default PasswordReset;
