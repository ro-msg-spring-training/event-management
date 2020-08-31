import { makeStyles, Theme, withStyles, Tooltip } from "@material-ui/core";

export const BuyTicketsSecondPageStyle = makeStyles((theme: Theme) => ({
  prevButtonStyle: {
    color: theme.palette.secondary.light,
    transform: 'rotate(-180deg)',
  },
  cancelButtonStyle: {
    color: theme.palette.secondary.contrastText,
    transform: 'rotate(-180deg)',
  },
  positionLeft: {
    position: 'absolute',
    bottom: "0.5%",
    left: "0.5%",
  },
  positionRight: {
    position: 'absolute',
    bottom: "0.5%",
    right: "0.5%",
  },
}))

export const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);