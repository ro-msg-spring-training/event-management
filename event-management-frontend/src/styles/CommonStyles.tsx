import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    right: 0
  },
  linkDecoration: {
    textDecoration: "none"
  },
  title: {
    flexGrow: 1,
  },
  shadow: {
    boxShadow: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  },
  eventTitle: {
    height: 50,
    padding: 20,
    color: '#133655',
    width: 100,
  },
  buttonStyle1: {
    textAlign: 'center',
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    letterSpacing: "2px",
    background: 'linear-gradient(90deg, #f9c929 20%, #f2ac0a 90%)',
    borderRadius: '20px',
    width: "85%",
    boxShadow: '0 1px 7px 1px #133C55',
  },
  buttonStyle2: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    borderRadius: '20px',
    width: "85%",
    // boxShadow: '0 1px 7px 1px #133C55',
    cursor: 'pointer',
    backgroundSize: '200%',
    transition: '0.3s',
    '&:hover': {
      backgroundPosition: "right",
    },
  },
  buttonStyle3: {
    backgroundImage: 'linear-gradient(45deg, #f9c929 10%, #f2ac0a 50%, #ed4d6e 90%)',
  },
  buttonStyle4: {
    width: "100%",
    borderRadius: "0px",
  },
  typography: {
    fontSize: 25,
    fontFamily: 'Monospace',
    color: theme.palette.text.primary,
    textTransform: "uppercase"
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  //Colors
  dark: {
    color: '#133655',
  },
  light: {
    color: '#6BB7D0',
  },
  ghost: {
    color: '#F4F5F9',
  },
  white: {
    color: '#FFFFFF',
  },
  yellow: {
    color: '#F2AE30',
  },
  active: {
    color: '#F2AE30',
    textDecoration: "none"
  },
  inactive: {
    color: '#6BB7D0',
    textDecoration: "none"
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    margin: "10px",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    // width: "100%",
    background: "transparent"
  },
  buttonCollapse: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    margin: "10px",
    boxShadow: "none"
  },
  left: {
    left: "100px"
  },
  floatRight: {
    float: "right",
    position: "relative"
  },
  cardRoot: {
    minWidth: 275,
    backgroundColor: '#6BB7D0',
    color: "#FFFFFF"
  },
  blueButton: {
    backgroundColor: '#6BB7D0',
    color: "#FFFFFF",
    '&:hover': {
      backgroundColor: '#6BB7D0',
      color: "#FFFFFF",
    },
  },
  mainCardRoot: {
    width: '25%',
    float: 'right'
  },
}));


export { useStyles }