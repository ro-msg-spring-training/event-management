import { makeStyles } from "@material-ui/core/styles";
import themeDark from "./Apptheme";

const useStylesbuyTicketFirstPage = makeStyles(() => ({
  paperStyle: {
    display: "block",
    maxWidth: "900px",
    marginLeft: "10%",
    minHeight: "150px",
    padding: "3%",
    // marginTop: "3%",
  },
  iconStyle: {
    width: 30,
    height: 30,
    color: "black",
    paddingRight: "2%",
    //paddingTop: "1%",
    verticalAlign: "middle",
  },
  iconStyleLocation: {
    width: 30,
    height: 30,
    color: "black",
    paddingRight: "2%",
    //paddingTop: "1%",
    //verticalAlign: "middle",
    //float: "left",
  },
  radioGroup: {
    maxWidth: "900px",
    fontFamily: "Monospace !important",
  },
  nextButton: {
    //maxWidth: "200px",
    float: "right",
    marginRight: "10%",
    fontSize: "large !important ",
    background: themeDark.palette.secondary.dark,
    "&:hover": {
      backgroundImage: "linear-gradient(45deg, #f9c929 10%, #f2ac0a 50%, #ed4d6e 90%)",
    },
  },

  link: {
    textDecoration: "none",
  },
  title: { fontSize: 50, fontFamily: "Monospace !important", margin: "5px" },
  pagecontainer: {
    background: "linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)",
    minHeight: "120vh",
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
  align: {
    //paddingTop: "10px !important",
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
    //background: "#21749a",
    background: themeDark.palette.primary.dark,
    //background: "linear-gradient(90deg, rgba(245,253,255,1) 9%, rgba(140,210,246,1) 51%, rgba(245,253,255,1) 88%)",
    //left: "-8px",
    marginLeft: "-5.4%",
    //zIndex: 2,
    "&:after": {
      marginTop: "0.5em",
      //content: "",
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
}));

export default useStylesbuyTicketFirstPage;
