import { makeStyles } from "@material-ui/core/styles";
import themeDark from "./Apptheme";
import { inherits } from "util";

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
    fontFamily: "LATO !important",
  },
  nextButton: {
    float: "right",
    marginRight: "10%",
    fontSize: "large !important ",
    background: themeDark.palette.secondary.dark,
    "&:hover": {
      backgroundColor: "#f9c929",
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
  title: { fontSize: 50, fontFamily: "LATO !important", margin: "5px" },
  pagecontainer: {
    background: "linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)",
    minHeight: "100vh",
    paddingTop: "4%",
  },
  generalInfoContainer: {
    display: "block",
    maxWidth: "inherit",
    minHeight: "70px",
    padding: "3%",
    paddingTop: "5%",
  },
  newLineSpan: {
    display: "inline-block",
    marginLeft: "1%",
    fontSize: 15,
    fontFamily: "LATO !important",
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
    fontFamily: "LATO !important",
    marginTop: 0,
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
    fontFamily: "LATO !important",
    textTransform: "uppercase",
  },
  styleblock: {
    display: "block",
  },
  cancelButton: {
    float: "right",
    fontSize: "large !important ",
    background: themeDark.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: "#FF6171",
    },
    marginRight: "3%",
  },
}));

export default useStylesbuyTicketFirstPage;
