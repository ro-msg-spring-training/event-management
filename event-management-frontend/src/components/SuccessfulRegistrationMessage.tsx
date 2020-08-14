import { Alert, AlertTitle } from "@material-ui/lab";
import useStylesSuccess from "../styles/FormSuccessStyle";
import React from "react";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

interface FromSuccessProps {
  successMessage: string;
}

export const RegistrationSucces = (props: FromSuccessProps) => {
  const classes = useStylesSuccess();

  if (props.successMessage) {
    return (
      <Alert severity="success" className={classes.success}>
        <AlertTitle>
          <strong>{props.successMessage}.</strong>
        </AlertTitle>
        <Trans i18nKey="successfulRegistration">
          We sent a verification code to your email account. After checking it please
          <Link color="secondary" to={"/login"}>
            <strong>log in</strong>
          </Link>
          to continue.
        </Trans>
      </Alert>
    );
  } else {
    return null;
  }
};
