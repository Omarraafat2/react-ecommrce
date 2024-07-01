import React, { createContext, useEffect, useState } from "react";

// Create the context with a default value
export const UserContext = createContext({
  userLogin: null,
  setUserLogin: () => {},
});

const UserContextProvider = (props) => {
  const [userLogin, setUserLogin] = useState(localStorage.getItem("userToken") || null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogin(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
