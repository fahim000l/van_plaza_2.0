// import useGetDbUser from "@/hooks/useGetDbUser";
import useGetDbUser from "@/hooks/useGetDbUser";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export const AUTH_CONTEXT = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoader, setAuthLoader] = useState(false);
  const [findingUser, setFindingUser] = useState("");
  const { data: sessionData, status: sessionStatus, update } = useSession();
  const { dbUser } = useGetDbUser(findingUser);

  useEffect(() => {
    if (sessionData && sessionStatus === "authenticated") {
      setFindingUser(sessionData?.user?.email);
    } else {
      setAuthUser(null);
      setAuthLoader(false);
    }
  }, [sessionData, sessionStatus]);

  useEffect(() => {
    if (dbUser) {
      setAuthUser(dbUser);
      setAuthLoader(false);
    }
  }, [dbUser]);

  const authInfo = {
    authUser,
    sessionData,
    sessionStatus,
    authLoader,
    setAuthLoader,
  };

  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
