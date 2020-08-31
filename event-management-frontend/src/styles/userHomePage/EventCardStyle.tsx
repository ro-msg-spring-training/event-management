import { makeStyles } from "@material-ui/core";

export const useEventCardStyle = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        paddingRight: '8%',
        paddingLeft: '8%',
    },
    day: {
        backgroundColor: theme.palette.secondary.dark,
    },
    visibleIcon: {
        cursor: 'pointer'
    },
    invisibleIcon: {
        visibility: 'hidden'
    },
    eventCard: {
        paddingRight: '8%',
        paddingLeft: '8%'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'space-between'
    },
}));
