import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Overview from './Overview';
import Location from './Location';
import Tickets from './Tickets';
import Images from './Images';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    color: theme.palette.text.primary,
    height: "100%",
    width: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.primary.dark}`,
    // minWidth: "75px"
  },
  tab: {
    paddingBottom: "25px",
    paddingTop: "25px",
  }

}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  // p={3}
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

export default function Stepper() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>

      <Grid container direction="row" justify="flex-start" alignItems="center">

        <Grid item xl={1} lg={2} md={2} sm={2} xs={3}>

          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            centered
          >
            {/* className={`rotate ${classes.tab}`}   */}
            <Tab label="Overview"  {...a11yProps(0)} />
            <Tab label="Location"  {...a11yProps(1)} />
            <Tab label="Tickets" {...a11yProps(2)} />
            <Tab label="Images" {...a11yProps(3)} />

          </Tabs>
        </Grid>

        <Grid item xl={11} lg={10} md={10} sm={10} xs={9}>
          <TabPanel value={value} index={0}>
            <Overview/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Location />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Tickets />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Images />
          </TabPanel>
        </Grid>

      </Grid>
    </div>
  );
}
