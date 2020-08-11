import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles({
    dragndrop: {
        border: '2px dashed #eeeeee',
        minHeight: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '25px',
        cursor: 'pointer',
    },
    image: {
        width: '100%',
        height: '100%',
        cursor: 'pointer'
    },
    imageContainer: {
        backgroundColor: '#eeeeee',
        paddingLeft: '12px',
        paddingRight: '12px'
    }
})