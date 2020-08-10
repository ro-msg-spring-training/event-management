import { makeStyles } from "@material-ui/core";

export const useFilterStyles = makeStyles({
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
        marginRight: '5px',
    },
    timeInput: {
        width: '40%'
    },
    filterExpandText: {
        cursor: 'pointer',
        fontSize: 12,
        marginTop: '5px'
    },
    highlightedCheckbox: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    extraFilterHeight: {
        overflow: 'hidden',
        transition: 'max-height 0.5s',
        maxHeight: '100%'
    },
    extraFilterHeightZero: {
        overflow: 'hidden',
        transition: 'max-height 0.5s',
        maxHeight: 0,
    },
    customDatePickerWidth: {
        '& .react-datepicker-wrapper': {
            width: '100%'
        }
    },
    datePicker: {
        width: '100%'
    }
}); 