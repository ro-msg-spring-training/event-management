import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {
  FormGroup,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useStylesLogin from "../../styles/loginStyle";
import { useStyles } from "../../styles/CommonStyles";
import { useHistory } from "react-router-dom";
import { validatePasswordRequirements, validateEmail, displayErrorMessage } from "../../validation/LoginValidation";
import { FormErrors } from "./FormErrors";
import { Trans } from "react-i18next";

const ForgotPasswordVerification = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newpassword, setPassword] = useState("");
  const [newpasswordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();
  const classesLogin = useStylesLogin();
  const history = useHistory();

  const [values, setValues] = React.useState<{ showPassword: boolean }>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (
      validatePasswordRequirements(newpassword, newpasswordError, setPasswordError) ||
      validateEmail(email, emailError, setEmailError)
    ) {
      return;
    }

    try {
      await Auth.forgotPasswordSubmit(email, verificationCode, newpassword);

      history.push("/changepasswordconfirmation");
    } catch (error) {
      displayErrorMessage(
        <Trans i18nKey="forgotPasswordVerification.errorMessage">Invalid verification code or email address!</Trans>,
        setError
      );
    }
  };

  return (
    <div className={classesLogin.root}>
      <FormGroup>
        <h1 className={classes.typography}>
          <Trans i18nKey="forgotPasswordVerification.title">Set new password</Trans>
        </h1>

        <p>
          <Trans i18nKey="forgotPasswordVerification.message">
            Please enter the verification code sent to your email address below, your email address and a new password.
          </Trans>
        </p>

        <TextField
          className={classesLogin.loginformItems}
          label={<Trans i18nKey="forgotPasswordVerification.code">Verification Code</Trans>}
          type="text"
          value={verificationCode}
          required
          variant="outlined"
          onChange={(e) => setVerificationCode(e.target.value)}
        />

        <TextField
          className={classesLogin.loginformItems}
          label="Email"
          type="email"
          value={email}
          variant="outlined"
          required
          helperText={emailError}
          error={emailError !== "" || validateEmail(email, emailError, setEmailError)}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
        />

        <FormControl className={classesLogin.loginformItems} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            <Trans i18nKey="forgotPasswordVerification.password">Password</Trans>
          </InputLabel>

          <OutlinedInput
            labelWidth={80}
            type={values.showPassword ? "text" : "password"}
            value={newpassword}
            required
            error={
              newpasswordError !== "" || validatePasswordRequirements(newpassword, newpasswordError, setPasswordError)
            }
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError("");
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{newpasswordError}</FormHelperText>
          <FormErrors error={error} />
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          onClick={onSubmit}
          className={`${classes.buttonStyle2} ${classes.buttonStyle3} ${classesLogin.loginButton}`}
        >
          Submit
        </Button>
      </FormGroup>
    </div>
  );
};

export default ForgotPasswordVerification;
