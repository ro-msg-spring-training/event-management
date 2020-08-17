import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    color: theme.palette.text.primary,
    height: "100%",
    width: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.primary.dark}`,
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

  return (
    <div className={classes.root}>

      <Grid container direction="row" justify="flex-start" alignItems="center">

        <Grid item xl={1} lg={2} md={2} sm={3} xs={3}>

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
        </Grid>

        <Grid item xl={11} lg={10} md={10} sm={9} xs={9}>
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
        </Grid>

      </Grid>
    </div>
  );
}

export default Stepper;