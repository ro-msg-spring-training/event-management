import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    relationArea: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    relationSelect: {
        marginRight: '5px'
    },
    datePicker: {
        display: 'flex',
        alignItems: 'stretch',
    },
    timeArea: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    timeInput: {
        width: '40%'
    }

});