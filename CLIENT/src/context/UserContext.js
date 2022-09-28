import { createContext, useEffect, useReducer, useState } from "react";
import api from "../api";
import { deleteTokenFromStorage, setTokenToStorage } from "../helpers";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");

  // const [user, setUser] = useState({ username: "", password: "" });

  const initialState = {
    isLogged: false,
    token: "",
    user: {
      username: "",
      password: "",
    },
  };

  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          login: true,
        };
      case "LOGOUT":
        return {
          ...state,
          login: false,
        };
      case "TOKEN":
        return {
          ...state,
          token: action.token,
        };

      case "USER":
        return {
          ...state,
          user: action.user,
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(userReducer, initialState);
  const { user, isLogged } = state;

  const login = async (user) => {
    try {
      const { data } = await api.login(user);
      const accessToken = data.accessToken;
      setTokenToStorage(accessToken);

      setToken(accessToken);
      // dispatch({
      //   type: "TOKEN",
      //   token: accessToken,
      // });
      dispatch({
        type: "LOGIN",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    deleteTokenFromStorage();
    setToken(null);
    // dispatch({
    //   type: "TOKEN",
    //   token: null,
    // });
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
        // setUser,
        login,
        logOut,
        // getUser,
        isLogged,
        dispatch,
        setToken,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
