import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./LoginPage.css"

function LoginPage() {
  const { login, logOut, getUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogin = () => {
    login()
      .then(() => {
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
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
            onChange={(event) => getUser(event.target.value, "username")}
            type="text"
            name="username"
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            onChange={(event) => getUser(event.target.value, "password")}
          />
        </div>
        <div className="input-container">

        <div className="button-container">
          <button className="login-button" onClick={handleLogin}>LOGIN</button>
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
