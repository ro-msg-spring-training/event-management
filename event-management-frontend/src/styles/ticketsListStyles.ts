import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    ticketsTitle: {
        color: '#F2AE30',
        fontSize: 24,
        fontWeight: 'bold'
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'visible',
        margin: 20
    }
});