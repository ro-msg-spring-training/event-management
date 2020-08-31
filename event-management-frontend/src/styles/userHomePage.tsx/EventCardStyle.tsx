import { makeStyles } from "@material-ui/core";

export const useEventCardStyle = makeStyles( theme =>({
    header: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        paddingRight: '10%',
        paddingLeft: '10%',
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
    card: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'auto'
    },
    eventCard: {
        paddingRight: '10%',
        paddingLeft: '10%'
    },
    calendarError: {
        alignSelf: 'flex-start'
    },
    pagination: {
        display: 'flex', 
        justifyContent: 'space-between'
    }
}));
