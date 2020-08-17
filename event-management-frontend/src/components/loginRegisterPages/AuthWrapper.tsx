import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordVerification from "./ForgotPasswordVerification";
import ChangePasswordConfirm from "./ChangePasswordConfirm";
import RegistrationPage from "./RegistrationPage";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import "../../styles/Responsivity.css";

const AuthWrapper = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="authComponentsResponsive">
      <Button onClick={() => changeLanguage("en")}>en</Button>
      <Button onClick={() => changeLanguage("ro")}>ro</Button>
      <hr />

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
