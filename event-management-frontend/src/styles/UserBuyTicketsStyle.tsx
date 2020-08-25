import { makeStyles, Theme } from "@material-ui/core";

export const userBuyTicketsStyle = makeStyles((theme: Theme) => ({
  position: {
    margin: "1%",
    width: "50%",
    left: "25%"
  },
  button: {
    position: 'absolute',
    bottom: "1%",
    left: 0,
  },
  typography: {
    padding: "1%",
    fontSize: "1.6em",
    color: theme.palette.primary.dark,
  },
}));