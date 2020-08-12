// import React, { useState } from 'react';
// import { Grid, Paper, makeStyles, Theme, Typography, TextField, FormControl, InputLabel, Select, MenuItem, withStyles, CheckboxProps, Checkbox, FormControlLabel } from '@material-ui/core';

// const YellowCheckbox = withStyles({
//   root: {
//     color: "#f2ac0a",
//     '&$checked': {
//       color: "#f2ac0a",
//     },
//   },
//   checked: {},
// })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: "80%",
//     },
//   },
//   grid: {
//     width: '100%',
//     margin: '0px',
//     // flexGrow: 1,
//     marginTop: '3%'
//   },
//   typography: {
//     padding: "1%",
//     fontSize: "2em",
//     color: theme.palette.primary.dark,
//   },
//   formControl: {
//     minWidth: 100,
//     marginBottom: '1.2em'
//   },
//   fundal: {
//     // width: "91vw",
//     // height: "100vh",
//     // width: window.outerWidth,
//     height: (window.innerHeight - 70), //70 is height of header
//     // minHeight: "93.5vh",
//     backgroundColor: theme.palette.background.default,
//   },
//   checkbox: {
//     color: theme.palette.secondary.dark
//   },
//   newBkg: {
//     background: 'linear-gradient(45deg, #f9c929 10%, #f2ac0a 90%)',
//   }

// }));

// let errors = {
//   title: "",
//   subtitle: "",
//   maxNb: "",
//   status: "",
//   description: "",
//   startDateAndTime: "",
//   endDateAndTime: ""
// }

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

// interface EventProps {
//   newEvent: boolean,
//   event: IProductDetailsReady
// }

// function Overview(props: EventProps) {
//   const classes = useStyles();
//   // const today: string = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]

//   // console.log(props.event.name);

//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [maxNb, setMaxNb] = useState(0);
//   const [status, setStatus] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDateAndTime, setStartDateAndTime] = useState("2017-05-24T10:30");
//   const [endDateAndTime, setEndDateAndTime] = useState("2017-05-24T10:30");

//   const [checkBoxState, setCheckboxState] = React.useState({
//     highlighted: false,
//   });

//   const handleChangeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCheckboxState({ ...checkBoxState, [event.target.name]: event.target.checked });
//   };

//   // let compareDates = function (date1: Date, date2: Date) {
//   //   if (date1 > date2) return 1;
//   //   else if (date1 < date2) return -1;
//   //   else return 0;
//   // }

//   let check = (field: string) => {
//     // let start = new Date(startDateAndTime)
//     // let today = new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0])

//     switch (field) {
//       case "title":
//         title.length + 1 < 3 ? errors.title = "Title needs at least 3 characters" : errors.title = ""
//         break;
//       case "subtitle":
//         subtitle.length + 1 < 3 ? errors.subtitle = "Subtitle needs at least 3 characters" : errors.subtitle = ""
//         break;
//       case "description":
//         description.length + 1 < 3 ? errors.description = "Description needs at least 3 characters" : errors.description = ""
//         break;
//       case "maxNb":
//         maxNb < 1 ? errors.maxNb = "There must be at least 2 people" : errors.maxNb = ""
//         break;
//       case "endDateAndTime":
//         let end = new Date(endDateAndTime);
//         let start = new Date(startDateAndTime);

//         console.log(end);
//         console.log(start);

//         // compareDates(end, start) === 1 ? errors.endDateAndTime = "End date must be after start date" : ""
//         break;
//       default:
//         break;
//     }

//     return errors;
//   }

//   let updateTitle = (value: string): void => {
//     setTitle(value);
//     check("title");
//   }

//   let updateSubtitle = (value: string): void => {
//     setSubtitle(value);
//     check("subtitle");
//   }

//   let updateDescription = (value: string): void => {
//     setDescription(value);
//     check("description");
//   }

//   let updateMaxNb = (value: number): void => {
//     setMaxNb(value);
//     check("maxNb");
//   }

//   // console.log(title);

//   const today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
//   return (
//     <>
//       <Paper className={classes.fundal}>
//         <Typography className={classes.typography}> Overview</Typography>

//         <Grid container direction="column" justify="center" alignItems="center">

//           <Grid item container direction="row" justify="center" alignItems="center">
//             <Grid item xl={3} lg={4} sm={8} xs={11}>
//               <form className={classes.root} autoComplete="off">
//                 <TextField
//                   name="title"
//                   fullWidth
//                   label="Title"
//                   variant="outlined"
//                   onChange={e => updateTitle(e.target.value)}
//                   defaultValue={props.newEvent === true ? "" : props.event.name}
//                   error={errors.title.length > 0}
//                   helperText={errors.title}
//                   required />
//               </form>
//             </Grid>

//             <Grid item xl={3} lg={4} sm={8} xs={11}>
//               <form className={classes.root} autoComplete="off">
//                 <TextField
//                   fullWidth
//                   label="Subtitle"
//                   variant="outlined"
//                   onChange={e => updateSubtitle(e.target.value)}
//                   defaultValue={props.newEvent === true ? "" : props.event.category}
//                   error={errors.subtitle.length > 0}
//                   helperText={errors.subtitle}
//                   required
//                 />
//               </form>
//             </Grid>

//             <Grid item xl={3} lg={4} sm={8} xs={11}>
//               <form className={classes.root} autoComplete="off">
//                 <TextField
//                   type="number"
//                   fullWidth
//                   label="Max Number Of People"
//                   variant="outlined"
//                   onChange={e => updateMaxNb(Number(e.target.value))}
//                   defaultValue={props.newEvent === true ? 0 : props.event.price}
//                   error={errors.maxNb.length > 0}
//                   helperText={errors.maxNb}
//                   required
//                 />
//               </form>
//             </Grid>

//           </Grid>

//           <Grid item container className={classes.grid} direction="row" justify="center" alignItems="center">
//             <Grid item xl={7} lg={7} sm={8} xs={7}>
//               <TextField

//                 label="Description"
//                 variant="outlined"
//                 multiline
//                 rows='5'
//                 rowsMax={7}
//                 onChange={e => updateDescription(e.target.value)}
//                 defaultValue={props.newEvent === true ? "" : props.event.description}
//                 error={errors.description.length > 0}
//                 helperText={errors.description}
//                 required
//                 fullWidth
//               />
//             </Grid>
//           </Grid>

//           <Grid item container spacing={2} className={classes.grid} direction="row" justify="center" alignItems="center">
//             <Grid item xl={2} lg={4} md={6} sm={6} xs={11}>
//               <form noValidate>
//                 <TextField
//                   label="Start Date and Time"
//                   type="datetime-local"
//                   onChange={e => setStartDateAndTime(e.target.value)}
//                   defaultValue={props.newEvent === true ? today : today}
//                   error={errors.startDateAndTime.length > 0}
//                   helperText={errors.startDateAndTime}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </form>
//             </Grid>

//             <Grid item xl={2} lg={4} md={6} sm={6} xs={11}>
//               <form noValidate>
//                 <TextField
//                   label="End Date and Time"
//                   type="datetime-local"
//                   onChange={e => setEndDateAndTime(e.target.value)}
//                   defaultValue={props.newEvent === true ? today : today}
//                   error={errors.endDateAndTime.length > 0}
//                   helperText={errors.endDateAndTime}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </form>
//             </Grid>

//           </Grid>

//           {/* TODO de luat valuarea corecta pt checkbox daca ii vorba de edit */}
//           <Grid item container className={classes.grid} direction="row" justify="center" alignItems="center">
//             <Grid item xl={1} lg={2} md={2} sm={3} xs={7}>
//               <FormControlLabel
//                 control={<YellowCheckbox checked={checkBoxState.highlighted} onChange={handleChangeCheckboxState} name="highlighted" />}
//                 label="Highlighted"
//               />
//             </Grid>

//             {/* TODO de luat valoarea corecta pt status daca ii vorba de edit */}
//             <Grid item xl={1} lg={2} md={2} sm={3} xs={7}>
//               <FormControl className={classes.formControl}>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={status}
//                   onChange={e => setStatus(e.target.value as string)}
//                 >
//                   <MenuItem value={"active"}>ACTIVE</MenuItem>
//                   <MenuItem value={"inactive"}>INACTIVE</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//         </Grid>

//       </Paper>
//     </>
//   );
// }

// export default Overview;

import React, { useState } from 'react';
import { Grid, Paper, makeStyles, Theme, Typography, TextField, FormControl, InputLabel, Select, MenuItem, withStyles, CheckboxProps, Checkbox, FormControlLabel } from '@material-ui/core';

const YellowCheckbox = withStyles({
  root: {
    color: "#f2ac0a",
    '&$checked': {
      color: "#f2ac0a",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "80%",
    },
  },
  grid: {
    width: '100%',
    margin: '0px',
    // flexGrow: 1,
    marginTop: '3%'
  },
  typography: {
    padding: "1%",
    fontSize: "2em",
    color: theme.palette.primary.dark,
  },
  formControl: {
    minWidth: 100,
    marginBottom: '1.2em'
  },
  fundal: {
    // height: "100vh",
    // width: window.outerWidth,
    height: (window.innerHeight), //70 is height of header
    // minHeight: "93.5vh",
    backgroundColor: theme.palette.background.default,
  },
  checkbox: {
    color: theme.palette.secondary.dark
  },
  newBkg: {
    background: 'linear-gradient(45deg, #f9c929 10%, #f2ac0a 90%)',
  }

}));

let errors = {
  title: "",
  subtitle: "",
  maxNb: "",
  status: "",
  description: "",
  startDateAndTime: "",
  endDateAndTime: ""
}

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

interface EventProps {
  match: any,
  admin: boolean,
}

interface Props {
  match: any,
  admin: boolean
}

function Overview({ match, admin }: Props) {
  const classes = useStyles();
  // const today: string = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]

  // console.log(props.event.name);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [maxNb, setMaxNb] = useState(0);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [startDateAndTime, setStartDateAndTime] = useState("2017-05-24T10:30");
  const [endDateAndTime, setEndDateAndTime] = useState("2017-05-24T10:30");

  const [checkBoxState, setCheckboxState] = React.useState({
    highlighted: false,
  });

  const handleChangeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState({ ...checkBoxState, [event.target.name]: event.target.checked });
  };

  let compareDates = function (date1: Date, date2: Date) {
    if (date1 > date2) return 1;
    else if (date1 < date2) return -1;
    else return 0;
  }

  let check = (field: string, value: string) => {
    // let start = new Date(startDateAndTime)
    let today = new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0])

    switch (field) {
      case "title":
        value.length < 3 ? errors.title = "Title needs at least 3 characters" : errors.title = ""
        break;
      case "subtitle":
        value.length < 3 ? errors.subtitle = "Subtitle needs at least 3 characters" : errors.subtitle = ""
        break;
      case "description":
        value.length < 3 ? errors.description = "Description needs at least 3 characters" : errors.description = ""
        break;
      case "maxNb":
        Number(value) < 2 ? errors.maxNb = "There must be at least 2 people" : errors.maxNb = ""
        break;
      case "startDateAndTime":
        let start = new Date(value);
        console.log(today);
        console.log(start);
        errors.startDateAndTime = compareDates(today, start) === 1 ?  "Start of event must be in the future" : ""

        break;
      case "endDateAndTime":
        // let end = new Date(endDateAndTime);
        // let start = new Date(startDateAndTime);

        console.log(endDateAndTime);
        console.log(startDateAndTime);
        console.log(value);

        // compareDates(end, start) === 1 ? errors.endDateAndTime = "End date must be after start date" : ""
        break;
      default:
        break;
    }

    return errors;
  }

  let updateTitle = (value: string): void => {
    setTitle(value);
    check("title", value);
  }

  let updateSubtitle = (value: string): void => {
    setSubtitle(value);
    check("subtitle", value);
  }

  let updateDescription = (value: string): void => {
    setDescription(value);
    check("description", value);
  }

  let updateMaxNb = (value: number): void => {
    setMaxNb(value);
    check("maxNb", String(value));
  }

  let updateStartDateAndTime = (value: string): void => {
    setStartDateAndTime(value);
    check("startDateAndTime", value);
  }

  let updateEndDateAndTime = (value: string): void => {
    setEndDateAndTime(value);
    check("endDateAndTime", value);
  }

  // console.log(title);

  const today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
  // const today = new Date().toString().split('GMT')[0]

  console.log(today);
  return (
    <>
      <Paper className={classes.fundal}>
        <Typography className={classes.typography}> Overview</Typography>

        <Grid container direction="column" justify="center" alignItems="center">

          <Grid item container direction="row" justify="center" alignItems="center">
            <Grid item xl={3} lg={4} sm={8} xs={11}>
              <form className={classes.root} autoComplete="off">
                <TextField
                  name="title"
                  fullWidth
                  label="Title"
                  variant="outlined"
                  onChange={e => updateTitle(e.target.value)}
                  // defaultValue={props.newEvent === true ? "" : props.event.name}
                  error={errors.title.length > 0}
                  helperText={errors.title}
                  required />
              </form>
            </Grid>

            <Grid item xl={3} lg={4} sm={8} xs={11}>
              <form className={classes.root} autoComplete="off">
                <TextField
                  fullWidth
                  label="Subtitle"
                  variant="outlined"
                  onChange={e => updateSubtitle(e.target.value)}
                  // defaultValue={props.newEvent === true ? "" : props.event.category}
                  error={errors.subtitle.length > 0}
                  helperText={errors.subtitle}
                  required
                />
              </form>
            </Grid>

            <Grid item xl={3} lg={4} sm={8} xs={11}>
              <form className={classes.root} autoComplete="off">
                <TextField
                  type="number"
                  fullWidth
                  label="Max Number Of People"
                  variant="outlined"
                  onChange={e => updateMaxNb(Number(e.target.value))}
                  // defaultValue={props.newEvent === true ? 0 : props.event.price}
                  error={errors.maxNb.length > 0}
                  helperText={errors.maxNb}
                  required
                />
              </form>
            </Grid>

          </Grid>

          <Grid item container className={classes.grid} direction="row" justify="center" alignItems="center">
            <Grid item xl={7} lg={7} sm={8} xs={7}>
              <TextField

                label="Description"
                variant="outlined"
                multiline
                rows='5'
                rowsMax={7}
                onChange={e => updateDescription(e.target.value)}
                // defaultValue={props.newEvent === true ? "" : props.event.description}
                error={errors.description.length > 0}
                helperText={errors.description}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} className={classes.grid} direction="row" justify="center" alignItems="center">
            <Grid item xl={2} lg={4} md={6} sm={6} xs={11}>
              <form noValidate>
                <TextField
                  label="Start Date and Time"
                  type="datetime-local"
                  onChange={e => updateStartDateAndTime(e.target.value)}
                  // defaultValue={props.newEvent === true ? today : today}
                  defaultValue={today}
                  error={errors.startDateAndTime.length > 0}
                  helperText={errors.startDateAndTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>

            <Grid item xl={2} lg={4} md={6} sm={6} xs={11}>
              <form noValidate>
                <TextField
                  label="End Date and Time"
                  type="datetime-local"
                  // onChange={e => setEndDateAndTime(e.target.value)}
                  onChange={e => updateEndDateAndTime(e.target.value)}
                  // defaultValue={props.newEvent === true ? today : today}
                  defaultValue={today}
                  error={errors.endDateAndTime.length > 0}
                  helperText={errors.endDateAndTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>

          </Grid>

          {/* TODO de luat valuarea corecta pt checkbox daca ii vorba de edit */}
          <Grid item container className={classes.grid} direction="row" justify="center" alignItems="center">
            <Grid item xl={1} lg={2} md={2} sm={3} xs={7}>
              <FormControlLabel
                control={<YellowCheckbox checked={checkBoxState.highlighted} onChange={handleChangeCheckboxState} name="highlighted" />}
                label="Highlighted"
              />
            </Grid>

            {/* TODO de luat valoarea corecta pt status daca ii vorba de edit */}
            <Grid item xl={1} lg={2} md={2} sm={3} xs={7}>
              <FormControl className={classes.formControl}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={e => setStatus(e.target.value as string)}
                >
                  <MenuItem value={"active"}>ACTIVE</MenuItem>
                  <MenuItem value={"inactive"}>INACTIVE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

        </Grid>

      </Paper>
    </>
  );
}

export default Overview;
