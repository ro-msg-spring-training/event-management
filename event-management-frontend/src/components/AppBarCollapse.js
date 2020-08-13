import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles/CommonStyles";

const AppBarCollapse = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonAppBarCollapse>
                <a href={"/"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.dark}>
                        Home
                    </Typography>
                </MenuItem></a>
                <a href={"/buildings"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        Buildings&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
                <a href={"/events"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.dark}>
                        Events&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
                <a href={"/statistics"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        Statistics&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
            </ButtonAppBarCollapse>

            <div className={classes.buttonBar}>
                <Button href='/'>
                    <Typography variant="h6" className={classes.light}>
                        Home&nbsp;&nbsp;
                    </Typography>
                </Button>
                <Button href='/buildings'>
                    <Typography variant="h6" className={classes.ghost} >
                        Buildings&nbsp;&nbsp;
                    </Typography></Button>
                <Button href='/events'>
                    <Typography variant="h6" className={classes.light}>
                        Events&nbsp;&nbsp;
                    </Typography>
                </Button>
                <Button href="/statistics">
                    <Typography variant="h6" className={classes.ghost}>
                        Statistics&nbsp;&nbsp;
                    </Typography>
                </Button>
            </div>
        </div>
    );
}

export default AppBarCollapse;