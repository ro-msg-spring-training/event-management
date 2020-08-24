import { makeStyles } from "@material-ui/core/styles";
import themeDark from "./Apptheme";

const useStylesCards = makeStyles(() => ({
  occupancyCard: {
    maxWidth: "320px",
    minHeight: "550px",
    marginTop: "20px",
    marginLeft: "auto",
    borderRadius: 16,
    "&:hover": {
      boxShadow: `0 6px 12px 0 grey`,
    },
  },
  cardContainer: {
    //marginLeft: "auto",
    marginRight: "700px",
  },
  title: {
    marginRight: "10px",
    display: "block",
    fontWeight: "bold",
    fontSize: "1.05rem",
  },
  cardTitle: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "1.75rem",
    color: "#fff",
    marginBottom: "10px",
    //backgroundColor: "white",
    textTransform: "uppercase",
  },
  listItem: {
    display: "block !important",
  },
  list: {
    listStyleType: "none !important ",
  },
  cardHeader: {
    //backgroundColor: "white",
  },
  card: {
    borderRadius: 16,
  },
  avatar: {
    backgroundColor: themeDark.palette.primary.dark,
    float: "left",
    padding: "3px",
    margin: "3px",
    marginRight: "20px",
    //marginTop: "16px !important",
    marginTop: "30px !important",
  },
  event: {
    float: "right",
  },
  block: {
    display: "inline !important",
  },
  occupancyRate: {
    paddingLeft: "50px",
  },
  dateRange: {
    margin: "2px",
    paddingLeft: "50px",
  },
  dateIcon: {
    marginRight: "5px",
  },
  dateText: {
    margin: "1px",
    display: "inline",
    marginBlockEnd: "5px",
    marginBlockStart: "0px",
  },
  dateEnd: {
    margin: "2px",
  },
}));

export default useStylesCards;
