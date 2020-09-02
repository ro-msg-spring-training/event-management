import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Grid, useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Overview from '@material-ui/icons/Assignment';
import Location from '@material-ui/icons/Room';
import Tickets from '@material-ui/icons/ConfirmationNumber';
import Images from '@material-ui/icons/Image';

const useStyles = makeStyles((theme: Theme) => ({
  rootResponsive: {
    "& .MuiTab-root": {
      minWidth: "20px",
      padding: "0px"
    },
    "& .MuiGrid-grid-xs": {
      maxWidth: "50%",
    },

  },
  root: {
    display: 'flex',
    color: theme.palette.text.primary,
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.primary.dark}`,
  },
  tab: {
    paddingBottom: "25px",
    paddingTop: "25px",
  },
  iconTabs: {
    borderRight: `1px solid ${theme.palette.primary.dark}`,
    marginTop: (window.innerHeight / 4)
  }

}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box width="auto"> {children} </Box>
      )}
    </div >
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface EventProps {
  overviewComponent: any,
  locationComponent: any,
  ticketsComponent: any,
  imagesComponent: any,
}

function Stepper(props: EventProps) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const iconTab = <>
    <Tabs
      orientation="vertical"
      value={value}
      onChange={handleChange}
      className={classes.iconTabs}
      centered
    >
      <Tab icon={<Overview />} {...a11yProps(0)} />
      <Tab icon={<Location />}  {...a11yProps(1)} />
      <Tab icon={<Tickets />} {...a11yProps(2)} />
      <Tab icon={<Images />} {...a11yProps(3)} />

    </Tabs>
  </>

  const textTab = <>
    <Tabs
      orientation="vertical"
      value={value}
      onChange={handleChange}
      className={classes.tabs}
      centered
    >

      <Tab label={t("welcome.overviewTab")}  {...a11yProps(0)} />
      <Tab label={t("welcome.locationTab")}  {...a11yProps(1)} />
      <Tab label={t("welcome.ticketsTab")} {...a11yProps(2)} />
      <Tab label={t("welcome.imagesTab")} {...a11yProps(3)} />

    </Tabs>
  </>

  const tabPanel = <>
    <TabPanel value={value} index={0}>
      {props.overviewComponent}
    </TabPanel>
    <TabPanel value={value} index={1}>
      {props.locationComponent}
    </TabPanel>
    <TabPanel value={value} index={2}>
      {props.ticketsComponent}
    </TabPanel>
    <TabPanel value={value} index={3}>
      {props.imagesComponent}
    </TabPanel>
  </>

  const bigWindow = <div className={classes.root}>
    <Grid container direction="row" justify="flex-start" alignItems="center">

      <Grid item xl={1} lg={2} md={2} sm={3} xs={3}>
        {textTab}
      </Grid>

      <Grid item xl={11} lg={10} md={10} sm={9} xs={9} style={{ minHeight: '93vh', backgroundColor: 'white' }}>
        {tabPanel}
      </Grid>

    </Grid>
  </div>

  const smallWindow = <div className={`${classes.root} ${classes.rootResponsive}`}>
    <Grid container direction="row" justify="flex-start">
      <Grid item xl={1} lg={2} md={2} sm={2} xs={1}>
        {iconTab}
      </Grid>

      <Grid item xl={11} lg={10} md={10} sm={9} xs={8} style={{ minHeight: '93vh', backgroundColor: 'white', minWidth: "91.6vw" }}>
        {tabPanel}
      </Grid>
    </Grid>
  </div>

  const matches = useMediaQuery('(max-width:599px)');
  return (
    <>
      {matches ? smallWindow : bigWindow}
    </>
  );
}

export default Stepper;