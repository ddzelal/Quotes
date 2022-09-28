import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./LoginPage.css";

function LoginPage() {
  const { login, logOut, dispatch } = useContext(UserContext);
  const [userInput, setUserInput] = useState("");

  const [password, setPassword] = useState("");

  const handleUser = (e) => {
    setUserInput(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const history = useHistory();

  const handleLogin = async () => {
    try {
      await login({ username: userInput, password: password });
      history.push("/home");

      dispatch({
        type: "USER",
        user: { username: userInput, password },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logOut();
  }, [logOut]);

  return (
    <div className="login-container">
      <div className="form">
        <div className="form-container">
          <div className="input-container">
            <label>Username </label>
            <input
              // onChange={(event) => getUser(event.target.value, "username")}
              onChange={handleUser}
              type="text"
              name="username"
              required
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              onChange={handlePassword}
              // onChange={(event) => getUser(event.target.value, "password")}
            />
          </div>
          <div className="input-container">
            <div className="button-container">
              <button className="login-button" onClick={handleLogin}>
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="image-container">
        <div className="login-image">
          <img src="https://t3.ftcdn.net/jpg/03/99/24/82/360_F_399248286_Ogm0T8CFeauN4Hdn42FqWfsCE02dJBbX.jpg"></img>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
