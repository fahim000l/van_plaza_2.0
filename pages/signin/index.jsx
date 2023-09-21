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

const signin = () => {
  const [passShow, setPassShow] = useState(false);
  const { data: sessionData } = useSession();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  // "/dashboard/stock-collection/products-stock"
  const handleGoogleSignIn = async () => {
    const confirmation = await signIn("google", {
      callbackUrl:
        sessionData?.user?.role === "admin"
          ? "/dashboard/stock-collection/products-stock"
          : "/",
    });

    if (confirmation?.status === 200) {
      console.log(confirmation);
      push(confirmation?.url);
    }
  };

  const handleSubmit = async (value) => {
    setLoading(true);
    const confirmation = await signIn("credentials", {
      redirect: false,
      email: value.email,
      password: value.password,
      callbackUrl: "/",
    });

    console.log(confirmation);
    if (confirmation?.status === 200) {
      setLoading(false);
      push(confirmation.url);
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
            <Button sx={{ color: "blue", textTransform: "none" }}>
              Forget Password ?
            </Button>
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
