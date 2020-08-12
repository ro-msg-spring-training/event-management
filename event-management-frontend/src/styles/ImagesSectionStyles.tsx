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
        '&:focus': {
            outline: 'none !important',
        },
        '&:hover': {
            backgroundColor: 'rgb(247, 247, 247) !important',
            transition: 'background-color 0.8s ease'
        }
    },
    image: {
        width: '100%',
        height: '100%',
        cursor: 'pointer'
    },
    imagesContainer: {
        backgroundColor: '#eeeeee',
    },
    imageWrapper: {
        position: 'relative'
    },
    deleteButton: {
        color: 'white',
        position: 'absolute',
        right: 5,
        top: 5,
        cursor: 'pointer'
    }
})