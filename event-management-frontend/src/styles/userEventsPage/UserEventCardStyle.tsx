import { makeStyles } from "@material-ui/core";

export const useCardStyle = makeStyles({
    root: {
        minHeight: '64vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    imageWrapper: {
        width: '100%',
        height: '32vh',
        backgroundSize: 'cover'
    },
    eventInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '3% 5%',
        '& div': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        }
    },
    detailsButton: {
        height: '50px',
        width: '100%',
        borderRadius: 0
    },
    iconInfo: {
        marginRight: '8px', 
        color: '#f2ac0a'
    }
})
