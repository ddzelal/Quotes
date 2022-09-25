import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function LoginPage() {
  const { login, getUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogin = () => {
    login();
    history.push("/home");
  };

  return (
    <div className="form">
      <div>
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
        <div className="button-container">
          <button onClick={handleLogin}>LOGIN</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
