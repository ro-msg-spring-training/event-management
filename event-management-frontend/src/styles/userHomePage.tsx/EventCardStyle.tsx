import { makeStyles } from "@material-ui/core";

export const useEventCardStyle = makeStyles( theme =>({
    header: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    },
    day: {
        backgroundColor: theme.palette.secondary.dark,
    },
    visibleIcon: {
        cursor: 'pointer'
    },
    invisibleIcon: {
        visibility: 'hidden'
    }
}))