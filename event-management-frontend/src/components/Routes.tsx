import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./loginRegisterPages/Login";
import ForgotPassword from "./loginRegisterPages/ForgotPassword";
import ForgotPasswordVerification from "./loginRegisterPages/ForgotPasswordVerification";
import ChangePasswordConfirm from "./loginRegisterPages/ChangePasswordConfirm";
import RegistrationPage from "./loginRegisterPages/RegistrationPage";
import { useTranslation } from "react-i18next";
import "../styles/Responsivity.css";
import Main from "./Main";
import { PrivateRoute } from "./PrivateRoute";

const AuthWrapper = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div className="authComponentsResponsive">
        {/* <Button onClick={() => changeLanguage("en")}>en</Button>
      <Button onClick={() => changeLanguage("ro")}>ro</Button>
      <hr /> */}

        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/forgotpassword" component={ForgotPassword}></Route>
          <Route path="/forgotpasswordverification" component={ForgotPasswordVerification}></Route>
          <Route path="/changepasswordconfirmation" component={ChangePasswordConfirm}></Route>
          <Route path="/register" component={RegistrationPage}></Route>
        </Switch>
      </div>
  );
};

export default AuthWrapper;
