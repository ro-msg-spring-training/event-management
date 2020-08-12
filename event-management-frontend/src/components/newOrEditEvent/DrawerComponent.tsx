import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, Typography } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import OverviewIcon from '@material-ui/icons/Subject';
import LocationIcon from '@material-ui/icons/LocationOn';
import TicketsIcon from '@material-ui/icons/ConfirmationNumber';
import ImagesIcon from '@material-ui/icons/Image';
import { useHistory, Switch, Route } from 'react-router-dom';
import Overview from '../Overview';
import Tickets from '../Tickets';
import Images from '../Images';
import Location from '../Location';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    position: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      marginTop: "6%",
      marginBottom: "5%",
      marginLeft: "75%"
    },
    typography: {
      fontSize: 20,
      fontFamily: 'Monospace',
      color: theme.palette.secondary.light,
      textTransform: "uppercase"
    },
    drawer: {
      width: "170px"
    }
  }),
);

interface Props {
  open: boolean,
  closeDrawer: any,
  eventId: number | undefined
  // children: any
}

export default function DrawerComponent({ open, closeDrawer, eventId }: Props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  // console.log(children);

  // eventId === undefined ? console.log("undefineddd") : console.log("found id");

  const direction = "left";
  const history = useHistory();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [direction]: open });
  };

  let handleClose = (): void => {
    toggleDrawer(false);
    closeDrawer();
  }

  const itemsList = [
    {
      text: "Overview",
      icon: <OverviewIcon />,
      onClick: () => eventId !== undefined ? history.push(`/overview/${eventId}`) : history.push(`/newEvent/overview`)
      // onClick: () => eventId !== undefined ? history.push(children[0].props.path + "/" + eventId) : history.push(`/newEvent/overview`)
    },
    {
      text: "Location",
      icon: <LocationIcon />,
      onClick: () => eventId !== undefined ? history.push(`/location/${eventId}`) : history.push(`/newEvent/location`)
    },
    {
      text: "Tickets",
      icon: <TicketsIcon />,
      onClick: () => eventId !== undefined ? history.push(`/tickets/${eventId}`) : history.push(`/tickets`)
    },
    {
      text: "Images",
      icon: <ImagesIcon />,
      onClick: () => eventId !== undefined ? history.push(`/images/${eventId}`) : history.push(`/images`)
    }
  ];


  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <IconButton onClick={handleClose} className={classes.position}>
        <KeyboardArrowLeftIcon color="primary" fontSize="large" />
      </IconButton>

      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>

      {/* <Link to={`/overview/${eventId}`}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <OverviewIcon />
            </ListItemIcon>
            <ListItemText primary={"Overview"} />
          </ListItem>
        </List>
      </Link> */}

      {/* <MenuList>
        <MenuItem component={Link} to={`/overview/${eventId}`}>
          pls mergi
        </MenuItem>
      </MenuList> */}

    </div>
  );


  return (
    <>
      {/* <Button onClick={toggleDrawer(true)}>left</Button> */}
      {/* <h1>{String(open)}</h1> */}
      <SwipeableDrawer
        className={classes.drawer}
        anchor={direction}
        open={state[direction] || open}
        // open={true}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>

      {/* <main>
        <Switch>
          <Route exact path='/overview/:id' render={props => <Overview match={props.match} admin={true} />}></Route>
          <Route exact path='/newEvent/overview' render={props => <Overview match={props.match} admin={true} />}></Route>
          <Route exact path='/location/:id' render={props => <Location match={props.match} />}></Route>
          <Route exact path='/tickets/:id' render={props => <Tickets match={props.match} />}></Route>
          <Route exact path='/images/:id' render={props => <Images match={props.match} />}></Route>
        </Switch>
      </main> */}
    </>

  );
}
