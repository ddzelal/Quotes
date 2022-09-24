import axios from "axios";
import { createContext, useState } from "react";
import { getCookie, setCookie } from "../utils";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("")

  const [user, setUser] = useState({ username: "", password: "" });

   const  login = async () => {
   
    const res = await  axios.post("http://localhost:8000/sessions",  user ).then(({data}) => {
        const accessToken = data.accessToken
        
        setToken(accessToken)   
        setCookie("accessToken", data.accessToken, 180);
        setIsLogged(true);
    });


  };

  const getUser = (value, inputType) => {
    setUser({ ...user, [inputType]: value });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        getUser,
        isLogged,
        setIsLogged,
        token
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
