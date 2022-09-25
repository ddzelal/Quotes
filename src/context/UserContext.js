import axios from "axios";
import { createContext, useEffect, useState } from "react";
import api from "../api";
import { setTokenToStorage } from "../helpers";
import { getCookie, setCookie } from "../utils";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");

  const [user, setUser] = useState({ username: "", password: "" });

  const login = async () => {
    const { data } = await api.login(user);
    const accessToken = data.accessToken;
    setToken(accessToken);
    // setCookie("accessToken", data.accessToken, 180);
    setIsLogged(true);
  };

  const getUser = (value, inputType) => {
    setUser({ ...user, [inputType]: value });
  };

  useEffect(() => {
    if (token) {
      setTokenToStorage(token);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        getUser,
        isLogged,
        setIsLogged,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
