import { makeStyles, Theme, withStyles, Tooltip } from "@material-ui/core";

export const BuyTicketsSecondPageStyle = makeStyles((theme: Theme) => ({
  prevButtonStyle: {
    background: theme.palette.secondary.dark,
    transform: 'rotate(-180deg)',
    "&:hover": {
      backgroundColor: "#f9c929",
    },
  },
  cancelButtonStyle: {
    background: theme.palette.secondary.contrastText,
    transform: 'rotate(-180deg)',
    "&:hover": {
      backgroundColor: "#FF6171",
    },
  },
  positionLeft: {
    position: 'absolute',
    bottom: "0.5%",
    left: '20%',
    marginRight: '0px',
  },
  positionRight: {
    position: 'absolute',
    bottom: "0.5%",
    right: '20%',
    marginLeft: '0px',
  },
}))

export const buyTicketsSecondPageDumbStyle = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '90vh',
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
    paddingTop: "4%",
  },
  wrapper: {
    minWidth: '30vw',
    minHeight: '40vh',
    background: 'white',
  },
  position: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    backgroundColor: 'white',
    maxWidth: '40vw',
    minHeight: '40vh',
    maxHeight: '60vh',
    paddinggBottom: '3vh',
  },
  background: {
    backgroundColor: 'white',
    padding: '10vh 20vw',
  },
  scroll: {
    overflowY: 'scroll'
  },
  paperStyle: {
    display: "block",
    height: '60vh',
    maxWidth: "900px",

    marginLeft: "20vw",
    marginRight: "20vw",
    minHeight: "150px",
    padding: "3%",
  },
}));

export const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
