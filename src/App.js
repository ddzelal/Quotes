import "./App.css";
import DisplayQuotes from "./components/DisplayQuotes";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";



function App() {

  const {isLogged} = useContext(UserContext)

  return (
    <div className="App">
        {!isLogged && <LoginPage />}
        {isLogged && <Header />}
        {isLogged && <DisplayQuotes />}
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

