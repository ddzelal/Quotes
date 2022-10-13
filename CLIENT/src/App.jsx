import "./App.css";
import DisplayQuotes from "./components/QuotePage/DisplayQuotes";
import LoginPage from "./components/LoginPage/LoginPage";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { getTokenFromStorage } from "./helpers";
import { ProtectedRoute } from "./RouterAut/ProtectedRoute";
import Header from "./components/HeaderComponent/Header";

function App() {
  const { dispatch, setToken, token } = useContext(UserContext);

  useEffect(() => {
    setToken(getTokenFromStorage() || "");
    // dispatch({
    //   type:"TOKEN",
    //   token:()=>getTokenFromStorage() || ""
    // })
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
