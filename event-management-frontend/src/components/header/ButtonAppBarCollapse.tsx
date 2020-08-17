import React from "react";
import { Menu } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import {useStyles} from "../../styles/CommonStyles";

const ButtonAppBarCollapse = (props: any) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className={classes.buttonCollapse}>
            <IconButton onClick={handleMenu} color={"secondary"}>
                <HomeIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
            >
                {props.children}
            </Menu>
        </div>
    );
}

export default ButtonAppBarCollapse;
