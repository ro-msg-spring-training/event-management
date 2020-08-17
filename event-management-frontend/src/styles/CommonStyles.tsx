import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  shadow: {
    boxShadow: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
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
    boxShadow: '0 1px 7px 1px #133C55',
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
  typography: {
    fontSize: 25,
    fontFamily: 'Monospace',
    color: theme.palette.text.primary,
    textTransform: "uppercase"
  },
}));

export { useStyles }