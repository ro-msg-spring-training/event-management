import { makeStyles, Theme } from "@material-ui/core";

export const useStylesSlider = makeStyles((theme: Theme) => ({
  slideContainer: {
    marginTop: "100px",
    width: "50%",
    backgroundColor: "darkgray",
  },
  sliderStyle: {
    width: "100%",
  },

  slideCard: {
    textAlign: "center",
    paddingTop: "10px",
    opacity: "1",
    width: "30%",
    color: "white",
  },

  car: {
    width: "600px",
    height: "500px",
  },

  slideImage: {
    display: "block",
    marginLeft: "40%",
  },

  dataContainer: {
    //width: "600px",
    // display: "float",
  },

  barna: {
    backgroundColor: "brown",
  },

  alacsony: {
    height: "300px",
  },

  slideDetails: {
    //width: "0%",
    color: "white",
    display: "float",
    overflow: "hidden",
    fontSize: "20px",
    whiteSpace: "nowrap",
    lineHeight: "28px",
    // marginLeft: "20%",
  },

  slideHour: {
    color: "white",
    display: "inline",
    overflow: "hidden",
    fontSize: "20px",
    whiteSpace: "nowrap",
    //  marginLeft: "30%",
  },

  slideLocation: {
    color: "white",
    display: "inline",
    overflow: "hidden",
    fontSize: "20px",
    whiteSpace: "nowrap",
    marginLeft: "5%",
  },
}));
