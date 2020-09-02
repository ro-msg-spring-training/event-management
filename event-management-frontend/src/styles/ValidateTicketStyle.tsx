import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export const useValidateTicketStyles = makeStyles((theme) => ({
  readerStyle: {
    width: '100%',
  },

  gridStyle: {
    // marginLeft: '30%',
    //marginRight: '10%',
  },

  root: {
    marginTop: '0%',
    width: '100%',
    minHeight: '99.9vh',
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },

  dialogStyle: {
    //background: 'green',
  },
}));
