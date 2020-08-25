import { makeStyles } from "@material-ui/core";

export const useUserFilterStyles = makeStyles({
    root: {
        margin: '30px 0',
        padding: '30px 0'
    },
    filterArea: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    filterButtonsArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    relationArea: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    relationSelect: {
        marginRight: '5px',
    },
    filterButtons: {
        width: '100%',
    }
}); 
