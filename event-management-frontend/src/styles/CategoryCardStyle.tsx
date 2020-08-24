import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStylesCategoryCard = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "135%",
    width: "135%",
    maxHeight: "400px",
  },

  cardStyle: {
    float: "left",
    width: "100%",
  },

  marginBasic: {
    margin: theme.spacing(1),
    width: "90%",
  },

  marginBasic2: {
    marginLeft: "-2%",
    marginRight: "20%",
  },

  marginBasic3: {
    marginLeft: "-2%",
    marginRight: "50%",
  },

  marginShortPrice: {
    margin: theme.spacing(1),
    width: "80%",
  },

  marginLong: {
    paddingBottom: "1.250em",
    marginRight: "4%",
    width: "92%",
  },

  marginShort: {
    width: "60%",
  },

  inputLong: {
    height: "5em",
  },

  inputShort: {
    height: "40px",
  },

  inputBasic: {
    height: "40px",
    width: "120%",
  },

  inputPrice: {
    maxHeight: "4px",
  },

  removeButton: {
    width: "40px",
    textAlign: "center",
    color: theme.palette.secondary.main,
    textTransform: "uppercase",
    background: "linear-gradient(90deg, #f9c929 20%, #f2ac0a 90%)",
    borderRadius: "10px",
    height: "40px",
  },

  footerDiv: {
    display: "inline-flex",
    marginLeft: "25%",
    width: "100%",
  },
}));
