import { withStyles, CheckboxProps, Checkbox } from "@material-ui/core";
import React from "react";

const YellowCheckbox = withStyles({
  root: {
    color: "#f2ac0a",
    '&$checked': {
      color: "#f2ac0a",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default YellowCheckbox;
