import React from "react";
import { Switch, Route } from "react-router-dom";
import UserHomePage from "./userHomePage/UserHomePage";
import Header from "./header/Header";
import UserTicketsPage from "./userTicketsPage/UserTicketsPage";
import UserEventsPage from "./userEventListPage/UserEventsPage";
import UserEventDetailsSmart from "./userEventDetailsPage/UserEventDetailsSmart";
import { SecureRoute } from "./SecureRoute";

const MainUser = () => {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <SecureRoute exact path="/user/events/:id" render={(props: any) => <UserEventDetailsSmart match={props.match} />} />
          <SecureRoute exact path="/user/tickets" component={UserTicketsPage} />
          <SecureRoute exact path="/user/events" component={UserEventsPage} />
          <SecureRoute exact path="/user" component={UserHomePage} />
        </Switch>
      </main>
    </div>
  );
};

export default MainUser;
