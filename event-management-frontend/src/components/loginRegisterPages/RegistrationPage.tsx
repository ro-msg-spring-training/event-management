import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Trans } from 'react-i18next';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { RegistrationSucces } from './SuccessfulRegistrationMessage';
import { Link } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { useStyles } from '../../styles/CommonStyles';
import { useStylesRegistration } from '../../styles/RegistrationPageStyle';
import {
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@material-ui/core';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateFirstName,
  validateLastName,
  validateUserName,
  displayUsernameError,
  displayErrorMessage,
  displaySuccessMessage,
} from '../../validation/RegistrationValidation';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [values, setValues] = React.useState<{ showPassword: boolean }>({
    showPassword: false,
  });

  const classes = useStylesRegistration();
  const classes2 = useStyles();

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (
      validateFirstName(firstName, firstNameError, setFirstNameError) ||
      validateLastName(lastName, lastNameError, setLastNameError) ||
      validateUserName(username, usernameError, setUsernameError) ||
      validateConfirmPassword(password, confirmPassword, confirmPasswordError, setConfirmPasswordError) ||
      validateEmail(email, emailError, setEmailError) ||
      validatePassword(password, passwordError, setPasswordError)
    ) {
      return;
    }

    try {
      await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
          email: email,
        },
      });

      setErrorMessage('');
      displaySuccessMessage(
        <Trans i18nKey="registration.successMessage">Registration successful</Trans>,
        setSuccessMessage
      );
    } catch (error) {
      switch (error.code) {
        case 'UsernameExistsException':
          displayUsernameError(<Trans i18nKey="registration.userExists">User already exists</Trans>, setUsernameError);
          displayErrorMessage(<Trans i18nKey="registration.userExists">User already exists</Trans>, setErrorMessage);
          break;
      }
    }
  };

  return (
    <div className={classes.root}>
      <FormGroup className={`${classes.registrationform}`}>
        <h1 className={` ${classes2.typography}`}>
          <Trans i18nKey="registration.title">Registration</Trans>
        </h1>
        <RegistrationSucces successMessage={successMessage} />
        <FormErrors error={errorMessage} />
        <br />
        <TextField
          required
          variant="outlined"
          className={classes.registrationformItems}
          label={<Trans i18nKey="registration.firstName">First Name</Trans>}
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
            setFirstNameError('');
          }}
          error={firstNameError !== ''}
          helperText={firstNameError}
        />
        <TextField
          required
          variant="outlined"
          className={classes.registrationformItems}
          label={<Trans i18nKey="registration.lastName">Last Name</Trans>}
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
            setLastNameError('');
          }}
          error={lastNameError !== ''}
          helperText={lastNameError}
        />
        <TextField
          required
          variant="outlined"
          className={classes.registrationformItems}
          name="email"
          label={<Trans i18nKey="registration.email">Email Address</Trans>}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError('');
          }}
          error={validateEmail(email, emailError, setEmailError) || emailError !== ''}
          helperText={emailError}
        />
        <TextField
          required
          variant="outlined"
          className={classes.registrationformItems}
          label={<Trans i18nKey="registration.username">Username</Trans>}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setUsernameError('');
          }}
          error={usernameError !== ''}
          helperText={usernameError}
        />
        <FormControl required variant="outlined" className={classes.registrationformItems}>
          <InputLabel>
            <Trans i18nKey="registration.password">Password</Trans>
          </InputLabel>
          <OutlinedInput
            type={values.showPassword ? 'text' : 'password'}
            labelWidth={80}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError('');
            }}
            error={validatePassword(password, passwordError, setPasswordError) || passwordError !== ''}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{passwordError}</FormHelperText>
        </FormControl>
        <FormControl required variant="outlined" className={classes.registrationformItems}>
          <InputLabel>
            <Trans i18nKey="registration.confirmPassword">Confirm Password</Trans>
          </InputLabel>
          <OutlinedInput
            type="password"
            labelWidth={145}
            onPaste={() => {
              return false;
            }}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setConfirmPasswordError('');
            }}
            error={validateConfirmPassword(password, confirmPassword, confirmPasswordError, setConfirmPasswordError)}
          />
          <FormHelperText>{confirmPasswordError}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          className={`${classes2.buttonStyle2} ${classes2.buttonStyle3} ${classes.registrationButton}`}
          type="submit"
          onClick={handleSubmit}
        >
          <Trans i18nKey="registration.button">Register</Trans>
        </Button>
        <div className={classes.loginLink}>
          <Trans i18nKey="registration.loginLink">
            Already have an account? <Link to="/login">Sign in!</Link>
          </Trans>
        </div>
      </FormGroup>
    </div>
  );
};

export default RegisterPage;
