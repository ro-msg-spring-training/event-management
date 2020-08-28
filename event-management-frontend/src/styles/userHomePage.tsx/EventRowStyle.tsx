import { makeStyles } from "@material-ui/core";

export const useEventRowStyle = makeStyles( theme =>({
    root: {
    //   border: '1px solid black',
    },
    eventIconInfo: {
        marginRight: '8px',
        color:  theme.palette.secondary.dark
    },
    eventDivInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    eventTitle: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:hover':{
            color: theme.palette.primary.light
        }
    }
}))