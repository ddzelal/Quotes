import "./App.css";
import DisplayQuotes from "./components/DisplayQuotes";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { getTokenFromStorage } from "./helpers";
import { ProtectedRoute } from "./RouterAut/ProtectedRoute";

function App() {
  const { setToken } = useContext(UserContext);

  useEffect(() => {
    setToken(getTokenFromStorage() || "");
  }, [setToken]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <ProtectedRoute path="/home" component={DisplayQuotes} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

export default App;
