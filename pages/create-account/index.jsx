import Main from "@/layouts/Main";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  AlternateEmail,
  Visibility,
  VisibilityOff,
  AccountBox,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { useFormik } from "formik";
import { createUserValidate } from "@/lib/validation";
import useStoreUser from "@/hooks/useStoreUser";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";

const signup = () => {
  const { authLoader, setAuthLoader } = useContext(AUTH_CONTEXT);
  const [passShow, setPassShow] = useState(false);
  const [cPassShow, setCPassShow] = useState(false);
  const [storingUser, setStoringUser] = useState(null);
  const { dbConfirmation } = useStoreUser(storingUser);
  const [uploadingImage, setUploadingImage] = useState("");
  const [uploadingFile, setUploadingFile] = useState(null);
  const hiddenInputRef = useRef();
  const { push } = useRouter();

  useEffect(() => {
    if (dbConfirmation) {
      setAuthLoader(false);
      Swal.fire("Your Account has been created", "Please Log In");
      push("/signin");
    }
  }, [dbConfirmation]);

  const handleSubmit = (values) => {
    setAuthLoader(true);
    const formData = new FormData();
    formData.append("upload", uploadingFile);
    fetch("/api/store-user-image-file", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((fileData) => {
        console.log(fileData);
        if (fileData.success) {
          values["profilePic"] = fileData?.fileInfo?.newFilename || "";
          console.log(values);
          setStoringUser(values);
        }
      });
  };

  const Formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
      profilePic: "",
    },
    validate: createUserValidate,
    onSubmit: handleSubmit,
  });

  return (
    <Main>
      <div className="lg:p-10 p-2 shadow-2xl shadow-blue-500 space-y-6 bg-base-100 rounded-lg lg:w-[70%] lg:my-10 mx-auto">
        <h3 className="lg:text-3xl text-xl font-bold text-center">
          Create your account
        </h3>
        <div className="flex lg:flex-row flex-col-reverse items-center justify-between">
          <div className="lg:w-[50%]">
            <form onSubmit={Formik.handleSubmit} className="mt-5">
              <TextField
                fullWidth
                error={Formik.errors.userName}
                helperText={Formik.errors.userName}
                sx={{ my: 2 }}
                placeholder="User Name"
                variant="filled"
                name="userName"
                {...Formik.getFieldProps("userName")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                name="email"
                error={Formik.errors.email}
                helperText={Formik.errors.email}
                sx={{ my: 2 }}
                placeholder="Email"
                variant="filled"
                {...Formik.getFieldProps("email")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <AlternateEmail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                sx={{ my: 2 }}
                fullWidth
                placeholder="Password"
                name="password"
                error={Formik.errors.password}
                helperText={Formik.errors.password}
                type={passShow ? "text" : "password"}
                variant="filled"
                {...Formik.getFieldProps("password")}
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
              <TextField
                sx={{ my: 2 }}
                fullWidth
                error={Formik.errors.cPassword}
                helperText={Formik.errors.cPassword}
                placeholder="Confirm Password"
                {...Formik.getFieldProps("cPassword")}
                name="cPassword"
                type={cPassShow ? "text" : "password"}
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment sx={{ cursor: "pointer" }}>
                      <IconButton onClick={() => setCPassShow(!cPassShow)}>
                        {cPassShow ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                loading={authLoader}
                type="submit"
                sx={{ backgroundColor: "darkblue !important" }}
                variant="contained"
                fullWidth
                startIcon={<AccountBox />}
              >
                Create Account
              </LoadingButton>
            </form>
            <Link href={"/signin"}>
              <Button sx={{ color: "blue", textTransform: "none" }}>
                Already have an account ?
              </Button>
            </Link>
          </div>
          <div className="lg:w-[50%] text-center">
            <Avatar
              src={uploadingImage}
              sx={{
                width: 250,
                height: 250,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              variant="rounded"
            >
              <AccountBox sx={{ width: 250, height: 250 }} />
            </Avatar>
            <input
              onChange={(event) => {
                setUploadingImage(URL.createObjectURL(event.target.files[0]));
                setUploadingFile(event.target.files[0]);
              }}
              className="hidden"
              ref={hiddenInputRef}
              type="file"
            />
            <Button
              onClick={() => hiddenInputRef.current.click()}
              className="text-[blue] font-bold text-center lg:text-lg text-sm normal-case"
            >
              Upload Profile Picture / Drag & Drop
            </Button>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default signup;
