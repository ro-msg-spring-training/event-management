import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeUser from "./homePageUser/HomeUser";
import Header from "./header/Header";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    background: "red",
  },
}));

const MainUser = () => {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/user" component={HomeUser} />
        </Switch>
      </main>
    </div>
  );
};

export default MainUser;
