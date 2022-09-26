import { createContext, useEffect, useState } from "react";
import api from "../api";
import { deleteTokenFromStorage, setTokenToStorage } from "../helpers";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");

  const [user, setUser] = useState({ username: "", password: "" });

  const login = async () => {
    try {
      const { data } = await api.login(user);
      const accessToken = data.accessToken;
      setTokenToStorage(accessToken);

      setToken(accessToken);
      setIsLogged(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    deleteTokenFromStorage();
    setToken(null);
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
        logOut,
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
