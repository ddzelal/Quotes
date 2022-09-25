import "./App.css";
import DisplayQuotes from "./components/DisplayQuotes";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getTokenFromStorage } from "./helpers";

function App() {
  const { setToken } = useContext(UserContext);

  useEffect(() => {
    setToken(getTokenFromStorage() || "");
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" component={DisplayQuotes} />
      </Switch>
    </div>
  );
}

export default App;

// LoginPage.PropTypes={
//   setLoggedin: Boolean.isRequired
// }

// LoginPage.defaultProps={
//   setLoggedin:true
// }
