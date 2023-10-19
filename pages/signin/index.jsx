import Main from "@/layouts/Main";
import React, { useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Loading,
  IconButton,
} from "@mui/material";
import {
  Google,
  AlternateEmail,
  Visibility,
  VisibilityOff,
  Login,
} from "@mui/icons-material";
import { signIn, useSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { useFormik } from "formik";
import { userLogInValidation } from "@/lib/validation";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";

const signin = () => {
  const [passShow, setPassShow] = useState(false);
  const { data: sessionData } = useSession();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [resetingPassEmail, setResetingPassEmail] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // "/dashboard/stock-collection/products-stock"

  const handlePassReset = () => {
    fetch("/api/reset-password-request", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: resetingPassEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data?.success) {
          Swal.fire("Check you email inbox or spam");
          setOpen(false);
        }
      });
  };

  const handleGoogleSignIn = async () => {
    const confirmation = await signIn("google", {
      callbackUrl: "/shop",
    });

    if (confirmation?.status === 200) {
      console.log(confirmation);
      const logedInUser = sessionData?.user;
      push(confirmation?.url);
    }
  };

  const handleSubmit = async (value) => {
    setLoading(true);
    const confirmation = await signIn("credentials", {
      redirect: false,
      email: value.email,
      password: value.password,
      callbackUrl: "/shop",
    });

    console.log(confirmation);
    if (confirmation?.status === 200) {
      console.log(confirmation);

      push(confirmation.url);
    } else {
      setLoading(false);
    }
  };

  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: userLogInValidation,
    onSubmit: handleSubmit,
  });

  return (
    <Main>
      <div className="lg:p-10 p-2 shadow-2xl shadow-blue-500 space-y-6 bg-base-100 rounded-lg lg:w-[40%] lg:my-10 mx-auto">
        <h3 className="lg:text-3xl text-xl font-bold text-center">
          Log In to your account
        </h3>
        <form onSubmit={Formik.handleSubmit} className="mt-5">
          <TextField
            fullWidth
            sx={{ my: 2 }}
            placeholder="Email"
            name="email"
            variant="filled"
            error={Formik.errors.email}
            helperText={Formik.errors.email}
            {...Formik.getFieldProps("email")}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <AlternateEmail />
                </InputAdornment>
              ),
            }}
          />
          <div>
            <TextField
              sx={{ my: 2 }}
              fullWidth
              placeholder="Password"
              variant="filled"
              error={Formik.errors.password}
              helperText={Formik.errors.password}
              name="password"
              {...Formik.getFieldProps("password")}
              type={passShow ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{ cursor: "pointer" }}>
                    <IconButton onClick={() => setPassShow(!passShow)}>
                      {passShow ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <Button
                onClick={handleClickOpen}
                sx={{ color: "blue", textTransform: "none" }}
              >
                Forget Password ?
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please provide your email to reset password
                  </DialogContentText>
                  <TextField
                    onChange={(e) => setResetingPassEmail(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handlePassReset}>Confirm</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <LoadingButton
            loading={loading}
            type="submit"
            sx={{ backgroundColor: "darkblue !important" }}
            variant="contained"
            fullWidth
            startIcon={<Login />}
          >
            Log In
          </LoadingButton>
        </form>
        <Divider>
          <Chip label="OR" />
        </Divider>
        <Button
          onClick={handleGoogleSignIn}
          fullWidth
          variant="outlined"
          startIcon={<Google />}
        >
          Sign In With Google
        </Button>
        <Link href={"/create-account"}>
          <Button sx={{ color: "blue", textTransform: "none" }}>
            Doesn't have an account ?
          </Button>
        </Link>
      </div>
    </Main>
  );
};

export default signin;
