import React, { createContext, useEffect, useState, useContext } from "react";
import { Storage } from "../utils/storage";

const UserContext = createContext(null);
const UserContextActions = createContext(null);

export const useUserContext = () => useContext(UserContext);
export const useUserActionsContext = () => useContext(UserContextActions);

const UserProvider = (props) => {
  const [user, setUser] = useState | (null > null);

  const setUserObj = (user) => {
    setUser(user);
    Storage.setItem("user", user);
  };

  useEffect(() => {
    setUser(Storage.getItem("user"));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserContextActions.Provider value={setUserObj}>
        {props.children}
      </UserContextActions.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
