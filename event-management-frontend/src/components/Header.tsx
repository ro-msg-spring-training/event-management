// import React, { useEffect } from 'react';
// import { Button, makeStyles, Grid, Typography, Container, CircularProgress } from '@material-ui/core';
// import { useStyles } from '../styles/CommonStyles'
// import { connect } from 'react-redux'
// import { loadEvent, deleteEvent, addEvent } from '../actions/HeaderActions';
// import Stepper from './Stepper';
// import { useHistory } from 'react-router-dom';

// const useStyles2 = makeStyles({
//   grid: {
//     background: 'linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)',
//     width: '100%',
//     margin: '0px',
//     flexGrow: 1,
//   },
//   secondGrid: {
//     width: '100%',
//     margin: '0px',
//     flexGrow: 1,
//   },
//   position: {
//     marginLeft: "2%"
//   }
// });

// interface IProductBase {
//   name: string,
//   category: string,
//   image: string,
//   description: string,
// }

// export interface IProductDetailsReady extends IProductBase {
//   id: number,
//   price: number
// }

// interface Props {
//   match: any,
//   admin: boolean,
//   fetchEventF: (id: string) => void,
//   deleteEventF: (id: string) => void,
//   addEventF: (event: IProductDetailsReady) => void,
//   fetchEvent: {
//     loading: boolean,
//     product: IProductDetailsReady,
//     error: string
//   },
// }

// //TODO desparte toate in smart si dumb
// function Header({ match, admin, fetchEventF, deleteEventF, addEventF, fetchEvent }: Props) {
//   const classes = useStyles();
//   const classes2 = useStyles2();
//   const history = useHistory();

//   let newEvent = match.path === "/newEvent" ? true : false;

//   useEffect(() => {//called once when component mountes and once when it unmounts
//     newEvent === true ? console.log("new") : fetchEventF(match.params.id)
//   }, [fetchEventF, match.params.id, newEvent])

//   let handleSave = (): void => {
//     console.log("Save");
//     //TODO verifica daca e save pentru NEW Product sau save pentru EDIT Product
//     //TODO mai fa o data verificari cand dai save
//     const product: IProductDetailsReady = { id: 51, name: "TEST TEST", category: "mock", price: 0, image: "mock", description: "mock" };
//     addEventF(product);
//     history.push('/');
//   }

//   let handleDelete = (): void => {
//     //daca admin da delete la NEW product atunci redirectioneaza-l pur si simplu la main page
//     match.path === "/newEvent" ? history.push('/') : deleteEventF(match.params.id);
//   }

//   if (fetchEvent.loading) {
//     return (
//       <Container maxWidth="sm">
//         <CircularProgress />
//       </Container>
//     );
//   }

//   //TODO de facut uneditable pt user
//   return (
//     <>
//       <header className={classes.shadow}>
//         <Grid container spacing={2} className={classes2.grid} direction="row" justify="space-between" alignItems="center">

//           <Grid item sm={3} xs={4}>
//             {/* TODO la new event sa stii care e id-ul pt ca momentan e -1 (luat don mock data) */}
//             <Typography align="left" className={`${classes.typography} ${classes2.position}`}> {fetchEvent.product.name}</Typography>
//           </Grid>

//           <Grid item sm={4} xs={5}>
//             <Grid container spacing={2} className={classes2.secondGrid} direction="row" justify="flex-end" alignItems="center">

//               <Grid item xs={6} md={5}>
//                 {admin === true ?
//                   <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleDelete}> Delete </Button>
//                   : null}
//               </Grid>

//               <Grid item xs={6} md={5}>
//                 {admin === true ?
//                   <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleSave}> Save </Button>
//                   : null}
//               </Grid>

//             </Grid>
//           </Grid>
//         </Grid>
//       </header>
//       <Stepper event={fetchEvent.product} newEvent={newEvent}/>
//     </>
//   );
// }

// // export default Header;
// const mapStateToProps = (state: any) => {
//   return {
//     fetchEvent: state.event
//   }
// }

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     fetchEventF: (id: string) => dispatch(loadEvent(id)),
//     deleteEventF: (id: string) => dispatch(deleteEvent(id)),
//     addEventF: (event: IProductDetailsReady) => dispatch(addEvent(event))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Header);


import React, { useEffect } from 'react';
import { Button, makeStyles, Grid, Typography, Container, CircularProgress, IconButton } from '@material-ui/core';
import { useStyles } from '../styles/CommonStyles'
import { connect } from 'react-redux'
import { loadEvent, deleteEvent, addEvent } from '../actions/HeaderActions';
import Stepper from './Stepper';
import { useHistory } from 'react-router-dom';
import DrawerComponent from './newOrEditEvent/DrawerComponent';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles2 = makeStyles({
  grid: {
    background: 'linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)',
    width: '100%',
    margin: '0px',
    flexGrow: 1,
  },
  secondGrid: {
    width: '100%',
    margin: '0px',
    flexGrow: 1,
  },
  position: {
    marginLeft: "2%"
  }
});

interface IProductBase {
  name: string,
  category: string,
  image: string,
  description: string,
}

export interface IProductDetailsReady extends IProductBase {
  id: number,
  price: number
}

interface Props {
  saveEvent: any,
  deleteEvent: any,
  openDrawer: any,
  admin: boolean,
  title: string,
  // fetchEventF: (id: string) => void,
  // deleteEventF: (id: string) => void,
  // addEventF: (event: IProductDetailsReady) => void,
  // fetchEvent: {
  //   loading: boolean,
  //   product: IProductDetailsReady,
  //   error: string
  // },
}

//TODO desparte toate in smart si dumb
function Header({ saveEvent, deleteEvent, openDrawer, admin, title }: Props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const history = useHistory();


  let handleSave = (): void => {
    // console.log("Save");
    //TODO verifica daca e save pentru NEW Product sau save pentru EDIT Product
    //TODO mai fa o data verificari cand dai save

    //TODO fa save la ce trebe
    // const product: IProductDetailsReady = { id: 51, name: "TEST TEST", category: "mock", price: 0, image: "mock", description: "mock" };
    saveEvent();
    // alert("Header save good hopefully");
    // history.push('/');
  }

  let handleDelete = (): void => {
    deleteEvent();
  }

  let handleOpenDrawer = (): void => {
    openDrawer();
  }

  return (
    <>
      <header className={classes.shadow}>
        <Grid container spacing={2} className={classes2.grid} direction="row" justify="space-between" alignItems="center">

          <Grid item sm={4} xs={5}>
            <Grid container spacing={2} className={classes2.secondGrid} direction="row" justify="flex-start" alignItems="center">
              <Grid item xs={5} md={3} lg={2}>
                <IconButton onClick={handleOpenDrawer}>
                  <MenuIcon color="secondary" fontSize="large" />
                </IconButton>
              </Grid>
              <Grid item xs={5} md={6}>
                <Typography align="left" className={`${classes.typography} ${classes2.position}`}> {title}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={4} xs={5}>
            <Grid container spacing={2} className={classes2.secondGrid} direction="row" justify="flex-end" alignItems="center">

              <Grid item xs={6} md={5}>
                {admin === true ?
                  <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleDelete}> Delete </Button>
                  : null}
              </Grid>

              <Grid item xs={6} md={5}>
                {admin === true ?
                  <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleSave}> Save </Button>
                  : null}
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </header>
    </>
  );
}

export default Header;
