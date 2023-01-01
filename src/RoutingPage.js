import React, {useState} from "react";
import AuthProvider from "./components/Store/AuthProvider";
import UserPage from "./components/User/UserPage";
import Login from "./components/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import Services from "./components/Admin/Services";
import ResetPassword from "./components/Admin/ResetPassword";
import NavBar from "./components/NavBar";

const RoutingPage = () => {
  const login_info = localStorage.getItem("loggedIn") !== null ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(login_info);

  const changeHandler = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} handler={changeHandler} />
      <Switch>
        <Route path="/" exact>
          <AuthProvider>
            <UserPage />
          </AuthProvider>
        </Route>
        <Route path="/AdminLogin">
          <Login handler={changeHandler} />
        </Route>
        <Route path="/AdminPage">
          <Services />
        </Route>
        <Route path="/ResetPassword">
          <ResetPassword />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default RoutingPage;
