import { makeStyles, Theme } from "@material-ui/core/styles";

const useStylesLogin = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  loginform: {
    flexGrow: 1,
    display: "flex",
    maxWidth: "450px",
    margin: "auto",
  },

  loginformItems: {
    paddingBottom: "1.250em !important",
  },

  loginButton: {
    marginLeft: "7% !important",
  },

  successDiv: {
    marginTop: "0px",
  },

  alignLeftDiv: {
    float: "right",
    marginTop: "-3%",
  },

  link: {
    textDecoration: "none",
  },
}));

export default useStylesLogin;
