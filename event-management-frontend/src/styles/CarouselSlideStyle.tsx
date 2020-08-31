import { makeStyles, Theme, fade } from "@material-ui/core";

export const useStylesCarousel = makeStyles((theme: Theme) => ({
  cardStyle: {
    borderStyle: "groove",
    pointerEvents: "none",
  },

  textOnImage: {
    position: "absolute",
    textAlign: "left",
    float: "left",
    display: "block",
    overflow: "hidden",
    color: theme.palette.secondary.dark,
    bottom: 13,
    //backgroundColor: fade("#ffffff", 0.1),
    fontSize: "24px",
    marginLeft: "30px",
    fontWeight: "bold",
    letterSpacing: "0.7px",
    width: "calc(78%)",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:hover": {
      overflow: "visible",
      whiteSpace: "normal",
    },
  },
  imageWrapper: { position: "relative" },

  loading: {
    marginTop: theme.spacing(5),
  },

  imageStyle: {
    pointerEvents: "fill",
    height: 220,
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },

  textStyle: {
    display: "block",
    overflow: "hidden",
    textAlign: "left",
    float: "left",
    color: theme.palette.primary.dark,
  },

  descriptionTextStyle: {
    display: "block",
    overflow: "hidden",
    textAlign: "left",
    float: "left",
    color: theme.palette.primary.dark,
    width: "calc(100%)",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:hover": {
      overflow: "visible",
      whiteSpace: "normal",
    },
  },

  title: {
    color: theme.palette.primary.main,
  },

  iconStyle: {
    marginRight: "8px",
    color: "#f2ac0a",
  },

  attributeStyle: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginLeft: theme.spacing(1),
  },

  dateStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },

  locationStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },

  carouselStyle: {
    marginTop: theme.spacing(5),
    height: "500px",
  },
}));
