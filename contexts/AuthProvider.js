// import useGetDbUser from "@/hooks/useGetDbUser";
import useGetDbUser from "@/hooks/useGetDbUser";
import { signOut, useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export const AUTH_CONTEXT = createContext();

const AuthProvider = ({ children }) => {
  const [authLoader, setAuthLoader] = useState(false);
  const { data: sessionData, status: sessionStatus, update } = useSession();
  const { dbUser: authUser, dbUserRefetch } = useGetDbUser(
    sessionData?.user?.email ? sessionData?.user?.email : null
  );

  useEffect(() => {
    if (sessionData && sessionStatus === "authenticated") {
      localStorage.setItem("van_jwt", sessionData?.jwt);
      if (localStorage?.getItem("van_jwt") === sessionData?.jwt) {
        sessionData.jwt = "";
      }
      dbUserRefetch();
      console.log(sessionData);
    } else {
      setAuthLoader(false);
    }
  }, [sessionData, sessionStatus]);

  useEffect(() => {
    if (authUser) {
      setAuthLoader(false);
    }
  }, [authUser]);

  useEffect(() => {
    console.log(sessionData, sessionStatus);
    if (!sessionData?.user) {
      signingOut();
    }
  }, [sessionData, sessionStatus]);

  const signingOut = () => {
    if (authUser) {
      fetch(`/api/delete-all-cart?user=${authUser?.email}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            signOut().then(() => localStorage.removeItem("van_jwt"));
          }
        });
    }
  };

  const authInfo = {
    authUser,
    sessionData,
    sessionStatus,
    authLoader,
    setAuthLoader,
    signingOut,
  };

  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
