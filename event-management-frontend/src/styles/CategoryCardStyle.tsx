import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStylesCategoryCard = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "135%",
    width: "100%",
    maxHeight: "400px",
  },

  cardStyle: {
    float: "left",
    width: "100%",
    paddingRight: "5%",
  },

  marginBasic: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  availableStyle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  marginShort: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  marginShortTicketNr: {
    width: "100%",
    marginTop: theme.spacing(1),
  },

  inputLong: {
    height: "5em",
  },

  inputBasic: {
    height: "40px",
  },

  inputPrice: {
    maxHeight: "4px",
  },

  removeButton: {
    width: "80px",
    textAlign: "center",
    color: theme.palette.secondary.main,
    textTransform: "uppercase",
    background: "linear-gradient(90deg, #f9c929 20%, #f2ac0a 90%)",
    borderRadius: "20px",
    height: "35px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },

  footerDiv: {
    display: "inline-flex",
    marginLeft: "25%",
    width: "100%",
  },
}));
