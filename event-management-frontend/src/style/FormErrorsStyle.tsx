import { makeStyles, Theme } from '@material-ui/core/styles';

const useStylesError = makeStyles((theme: Theme)=>({
    error: {
        color: 'red',
        paddingBottom : '0.6250em',
        margin: '0px 2px 30px 2px',
        textAlign: 'left',
    },
}))

export default useStylesError;
