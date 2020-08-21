import React from 'react';
import { Grid, Paper, makeStyles, Theme, Typography, TextField, FormControl, InputLabel, Select, MenuItem, withStyles, CheckboxProps, Checkbox, FormControlLabel } from '@material-ui/core';
import { EventCrud } from '../../../model/EventCrud';
import { useTranslation } from 'react-i18next';

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
    // marginTop: '3%'
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
    // width: "91vw",
    // height: "100vh",
    // width: window.outerWidth,
    // height: (window.innerHeight - 70), //70 is height of header
    
    padding: "3.9%",
    display: "flex",
    flexWrap: "wrap",

    // height: "100%",
    // minHeight: "93.5vh",
  },
  checkbox: {
    color: theme.palette.secondary.dark
  },
  newBkg: {
    background: 'linear-gradient(45deg, #f9c929 10%, #f2ac0a 90%)',
  },
  margin: {
    marginTop: '1%',
    marginBottom: '1%',
  }

}));

interface OverviewDumbProps {
  newEvent: boolean,
  event: EventCrud,
  admin: boolean,
  handleEnterKey: any,
  handleChange: any,
  formErrors: {
    title: string,
    subtitle: string,
    description: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    maxPeople: string,
  },
  // highlighted: boolean,
  handleChangeCheckboxState: any,
  setStatus: any,
  // status: string,
  // currDate: string,
  // currTime: string,
}

function OverviewDumb(props: OverviewDumbProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
      <div className={classes.fundal}>
        <Typography className={classes.typography}></Typography>

        <Grid container direction="column" justify="center" alignItems="center">

          <Grid item container direction="row" justify="center" alignItems="center">
            <Grid item xl={8} lg={4} sm={8} xs={11}>
              <form className={classes.root} autoComplete="off">
                <TextField
                  onKeyDown={props.handleEnterKey}
                  disabled={!props.admin}
                  name="title"
                  fullWidth
                  label={t("welcome.overviewTitle")}
                  variant="outlined"
                  onChange={props.handleChange}
                  defaultValue={ props.event.title}
                  error={props.formErrors.title.length > 0}
                  helperText={props.formErrors.title}
                  required />
              </form>
            </Grid>

            <Grid item xl={8} lg={4} sm={8} xs={11}>
              <form className={classes.root} autoComplete="off">
                <TextField
                  onKeyDown={props.handleEnterKey}
                  name="subtitle"
                  disabled={!props.admin}
                  fullWidth
                  label={t("welcome.overviewSubtitle")}
                  variant="outlined"
                  onChange={props.handleChange}
                  defaultValue={ props.event.subtitle}
                  error={props.formErrors.subtitle.length > 0}
                  helperText={props.formErrors.subtitle}
                  required
                />
              </form>
            </Grid>

            <Grid item xl={8} lg={4} sm={8} xs={11}>
              <form className={classes.root} autoComplete="off">
                <TextField
                  onKeyDown={props.handleEnterKey}
                  name="maxPeople"
                  disabled={!props.admin}
                  type="number"
                  fullWidth
                  label={t("welcome.overviewMaxPpl")}
                  variant="outlined"
                  onChange={props.handleChange}
                  defaultValue={props.event.maxPeople}
                  error={props.formErrors.maxPeople.length > 0}
                  helperText={props.formErrors.maxPeople}
                  required
                />
              </form>
            </Grid>

          </Grid>

          <Grid item container className={classes.grid} direction="row" justify="center" alignItems="center">
            <Grid item xl={7} lg={7} sm={8} xs={7}>
            <form className={classes.root}>
              <TextField
                className={classes.margin}
                onKeyDown={props.handleEnterKey}
                name="description"
                disabled={!props.admin}
                label={t("welcome.overviewDescription")}
                variant="outlined"
                multiline
                rows='5'
                rowsMax={7}
                onChange={props.handleChange}
                defaultValue={ props.event.description}
                error={props.formErrors.description.length > 0}
                helperText={props.formErrors.description}
                required
                fullWidth
              />
              </form>
            </Grid>
          </Grid>

          <Grid item container spacing={2} className={classes.grid} direction="row" justify="center" alignItems="center">

            <Grid item container spacing={2} className={classes.grid} direction="row" justify="center" alignItems="center">
              <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
                <form className={classes.root} autoComplete="off">
                  <TextField
                    label={t("welcome.overviewStartDate")}
                    name="startDate"
                    disabled={!props.admin}
                    type="date"
                    onChange={props.handleChange}
                    defaultValue={props.event.startDate}
                    error={props.formErrors.startDate.length > 0}
                    helperText={props.formErrors.startDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </Grid>

              <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
                <form className={classes.root} autoComplete="off">
                  <TextField
                    label={t("welcome.overviewStartTime")}
                    name="startTime"
                    disabled={!props.admin}
                    type="time"
                    onChange={props.handleChange}
                    defaultValue={props.event.startHour}
                    error={props.formErrors.startTime.length > 0}
                    helperText={props.formErrors.startTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </form>
              </Grid>
            </Grid>

            <Grid item container spacing={2} className={classes.grid} direction="row" justify="center" alignItems="center">
              <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
                <form className={classes.root} autoComplete="off">
                  <TextField
                    label={t("welcome.overviewEndDate")}
                    name="endDate"
                    disabled={!props.admin}
                    type="date"
                    onChange={props.handleChange}
                    defaultValue={ props.event.endDate}
                    error={props.formErrors.endDate.length > 0}
                    helperText={props.formErrors.endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </Grid>

              <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
                <form className={classes.root} autoComplete="off">
                  <TextField
                    label={t("welcome.overviewEndTime")}
                    name="endTime"
                    disabled={!props.admin}
                    type="time"
                    onChange={props.handleChange}
                    defaultValue={props.event.endHour}
                    error={props.formErrors.endTime.length > 0}
                    helperText={props.formErrors.endTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </form>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        <Grid item container className={classes.grid} direction="row" justify="center" alignItems="center">
          <Grid item xl={1} lg={2} md={2} sm={3} xs={7}>
            <FormControlLabel
              disabled={!props.admin}
              control={<YellowCheckbox checked={props.event.highlighted} onChange={props.handleChangeCheckboxState} name="highlighted" />}
              label={t("welcome.overviewHighlighted")}
            />
          </Grid>

          <Grid item xl={1} lg={2} md={2} sm={3} xs={7}>
            <FormControl className={classes.formControl}>
              <InputLabel>Status</InputLabel>
              <Select
                disabled={!props.admin}
                value={props.event.status? "true": "false"}
                onChange={e => props.setStatus(e.target.value as string)}
              >
                <MenuItem value={"true"}>{t("welcome.overviewStatusActive")}</MenuItem>
                <MenuItem value={"false"}>{t("welcome.overviewStatusInactive")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      </div>
  );
}

export default OverviewDumb;
