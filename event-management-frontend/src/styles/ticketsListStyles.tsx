import { makeStyles } from "@material-ui/core";

export const useStylesTickets = makeStyles(theme => ({
    ticketsTitle: {
        color: '#F2AE30',
        fontSize: 24,
        fontWeight: 'bold'
    },
    pdfButton: {
        [theme.breakpoints.down("xs")]: {
            padding: 0
        },
        [theme.breakpoints.up("sm")]: {
            padding: 20
        },
    },
    linkDecoration: {
        textDecoration: 'none'
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'visible',
        margin: 20
    },
    ticketColumnMobile: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    tableCellPadding: {
      //paddingRight: 30,
    },
    paddingTable: {
        margin: 30,
    }
}));
