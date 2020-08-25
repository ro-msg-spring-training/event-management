import { makeStyles, Theme } from "@material-ui/core";

export const useStylesCategoryPage = makeStyles((theme: Theme) => ({
  alignMe: {
    float: "left",
    marginLeft: "9%",
  },
  title: {
    float: "left",
    marginLeft: "12%",
  },
  maxTickets: {
    marginLeft: "3%",
    width: "100%",
  },
  inlineHeader: {
    display: "inline-flex",
    float: "left",
    marginLeft: "9%",
    width: "100%",
  },
  gridStyle: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
  },
  gridStyleHeader: {
    marginLeft: "9%",
  },
  ticketInfoStyle: {
    width: "100%",
    marginLeft: "3%",
  },

  button: {
    width: "90%",
    marginLeft: "5%",
    marginTop: "20px",
    height: "50px",
    textAlign: "center",
    color: theme.palette.secondary.main,
    textTransform: "uppercase",
    background: "linear-gradient(90deg, #f9c929 20%, #f2ac0a 90%)",
    borderRadius: "20px",
    boxShadow: "0 1px 7px 1px #133C55",
  },
}));
