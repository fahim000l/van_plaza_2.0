import { useEffect, useState } from "react";

const useStoreUser = (userInfo) => {
  const [dbConfirmation, setDbConfirmation] = useState(null);
  useEffect(() => {
    if (userInfo) {
      fetch("/api/auth/store-user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          setDbConfirmation(data);
        });
    }
  }, [userInfo]);

  return { dbConfirmation };
};

export default useStoreUser;
