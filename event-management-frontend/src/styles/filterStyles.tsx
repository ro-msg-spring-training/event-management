import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    filterButtonsArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    relationArea: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    timeArea: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    relationSelect: {
        marginRight: '5px'
    },
    timeInput: {
        width: '40%'
    },
    filterExpandText: {
        cursor: 'pointer',
        fontSize: 12
    },
    highlightedCheckbox: {
        display: 'flex',
        alignItems: 'flex-end'
    }
});