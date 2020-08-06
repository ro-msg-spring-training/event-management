import { createMuiTheme } from '@material-ui/core/styles';

// TASK: Change the theme of the Material UI components by switching the primary color to #a01441.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#133655',
        },
        secondary: {
            main: '#6BB7D0',
        },
        warning: {
            main: '#F4F5F9',
        },
        success: {
            main: '#FFFFFF',
        },
        info: {
            main: '#F2AE30',
        },
    }
});

export default theme;