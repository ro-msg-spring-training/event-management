import { makeStyles } from "@material-ui/core/styles";
import themeDark from "./Apptheme";

const useStylesbuyTicketFirstPage = makeStyles(() => ({
  paperStyle: {
    display: "block",
    maxWidth: "900px",
    marginLeft: "10%",
    minHeight: "150px",
    padding: "3%",
  },
  iconStyle: {
    width: 30,
    height: 30,
    color: "black",
    paddingRight: "2%",
    verticalAlign: "middle",
  },
  iconStyleLocation: {
    width: 30,
    height: 30,
    color: "black",
    paddingRight: "2%",
  },
  radioGroup: {
    maxWidth: "900px",
    fontFamily: "Monospace !important",
  },
  nextButton: {
    float: "right",
    marginRight: "10%",
    fontSize: "large !important ",
    background: themeDark.palette.secondary.dark,
    "&:hover": {
      backgroundImage: "linear-gradient(45deg, #f9c929 10%, #f2ac0a 50%, #ed4d6e 90%)",
    },
    "&:disabled": {
      backgroundColor: "white !important",
      color: "black !important",
      backgroundImage: "linear-gradient(90deg, rgba(245,253,255,1) 0%, rgba(202,202,209,1) 1%)",
    },
  },

  link: {
    textDecoration: "none",
  },
  title: { fontSize: 50, fontFamily: "Monospace !important", margin: "5px" },
  pagecontainer: {
    background: "linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)",
    minHeight: "100vh",
    paddingTop: "4%",
  },
  generalInfoContainer: {
    display: "block",
    maxWidth: "900px",
    minHeight: "70px",
    padding: "3%",
    paddingTop: "5%",
  },
  newLineSpan: {
    display: "inline-block",
    marginLeft: "1%",
    fontSize: 16,
  },
  spacing: {
    margin: " 10px ",
  },

  locationName: {
    fontWeight: 700,
    fontSize: "1.05rem",
  },
  styleInline: {
    display: "inline-block",
  },
  textStyle: {
    fontSize: 16,
    fontFamily: "Monospace !important",
  },
  tag: {
    width: "50%",
    height: "50px",

    background: themeDark.palette.primary.dark,

    marginLeft: "-5.4%",

    "&:after": {
      marginTop: "0.5em",

      float: "left",
      border: "1.5em solid #fff",
      borderRightColor: "transparent",
    },
    color: "white",
    paddingTop: "3%",
    paddingLeft: "4%",
    marginTop: "2%",
  },
  tagText: {
    fontSize: 16,
    fontFamily: "Monospace !important",
    textTransform: "uppercase",
  },
  styleblock: {
    display: "block",
  },
  cancelButton: {
    float: "right",
    fontSize: "large !important ",
    background: themeDark.palette.secondary.dark,
    "&:hover": {
      backgroundImage: "linear-gradient(45deg, #f9c929 10%, #f2ac0a 50%, #ed4d6e 90%)",
    },
    marginRight: "3%",
  },
}));

export default useStylesbuyTicketFirstPage;
