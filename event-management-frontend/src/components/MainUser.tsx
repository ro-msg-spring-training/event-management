import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeUser from "./homePageUser/HomeUser";
import Header from "./header/Header";
import BuyTicketFirstPageSmart from "./userBuyTicketsPage/firstPage/BuyTicketFirstPageSmart";
import BuyTicketsSecondPageSmart from "./userBuyTicketsPage/secondPage/BuyTicketsSecondPageSmart";

const MainUser = () => {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/user/reserve-tickets/first-page/:id"
            render={(renderProps) => <BuyTicketFirstPageSmart matching={renderProps}></BuyTicketFirstPageSmart>}
          />
          <Route exact path='/user/reserve-tickets/second-page/:id'
                        render={props => <BuyTicketsSecondPageSmart match={props.match} />} />
          <Route exact path="/user" component={HomeUser} />
        </Switch>
      </main>
    </div>
  );
};

export default MainUser;
