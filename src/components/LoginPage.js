import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
function LoginPage() {
  const { user, login, getUser } = useContext(UserContext);

  return (
    <div className="form">
      <form>
        <div className="input-container">
          <label >
            Username{" "}
          </label>
          <input onChange={(event) => getUser(event.target.value, "username")} type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            onChange={(event) => getUser(event.target.value, "password")}
          />
        </div>
        <div className="button-container">
          <input onClick={login} placeholder="Login" />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
