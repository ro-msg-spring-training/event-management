import React from 'react';
import { Switch } from 'react-router-dom';
import Home from './homePage/Home';
import EventList from './eventListPage/listSection/EventListSmart';
import Header from './header/Header';
import EventDetails from './eventCreateOrEdit/EventDetails';
import { SecureRoute } from './SecureRoute';

const Main = () => {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <SecureRoute
            admin
            exact
            path="/admin/events/:id"
            component={(props: any) => <EventDetails match={props.match} admin={true} />}
          />
          <SecureRoute admin exact path="/admin/events" component={EventList} />
          <SecureRoute
            admin
            exact
            path="/admin/newEvent"
            component={(props: any) => <EventDetails match={props.match} admin={true} />}
          />
          <SecureRoute admin exact path="/admin" component={Home} />
        </Switch>
      </main>
    </>
  );
};

export default Main;
