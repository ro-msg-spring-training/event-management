import { makeStyles } from "@material-ui/core";

export const useStyles2 = makeStyles(theme => ({
  grid: {
    background: 'linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)',
    width: '100%',
    margin: '0px',
    flexGrow: 1,
  },
  typography: {
    fontSize: 25,
    fontFamily: 'Monospace',
    textTransform: "uppercase"
  },
  position: {
    marginTop: "2vh",
    marginBottom: "2vh",
  }
}));