import React from 'react';
import {
  FormGroup,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Avatar,
  FormHelperText,
} from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import { FormErrors } from './FormErrors';
import { useStyles } from '../../styles/CommonStyles';
import useStylesLogin from '../../styles/LoginStyle';
import { Link } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import RO from '../../languageImages/RO.png';
import EN from '../../languageImages/EN.png';
import { RegistrationSucces } from './SuccessfulRegistrationMessage';
import { validateConfirmPassword, validatePassword, validateEmail } from '../../validation/RegistrationValidation';
import { useStylesRegistration } from '../../styles/RegistrationPageStyle';

interface Props {
  error: string;
  success: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  values: { showPassword: boolean };
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  usernameError: string;
  passwordError: string;
  confirmPasswordError: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setFirstNameError: (firstName: string) => void;
  setLastNameError: (lastName: string) => void;
  setEmailError: (email: string) => void;
  setUsernameError: (username: string) => void;
  setPasswordError: (password: string) => void;
  setConfirmPasswordError: (confirmPassword: string) => void;
  handleClickShowPassword: () => void;
  onSubmit: () => void;
}

const RegistrationDumb = ({
  error,
  success,
  firstName,
  lastName,
  email,
  username,
  password,
  confirmPassword,
  values,
  firstNameError,
  lastNameError,
  emailError,
  usernameError,
  passwordError,
  confirmPasswordError,
  setFirstName,
  setLastName,
  setEmail,
  setUsername,
  setPassword,
  setConfirmPassword,
  setFirstNameError,
  setLastNameError,
  setEmailError,
  setUsernameError,
  setPasswordError,
  setConfirmPasswordError,
  handleClickShowPassword,
  onSubmit,
}: Props) => {
  const [, i18n] = useTranslation();
  const classes = useStylesRegistration();
  const classes2 = useStyles();
  const classesLogin = useStylesLogin();

  const handleChangeAppLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.registrationItem('i18nextLng', language);
  };

  return (
    <div className={classes.root}>
      <FormGroup className={`${classes.registrationform}`}>
        <h1 className={` ${classes2.typography}`}>
          <Trans i18nKey="registration.title">Registration</Trans>
        </h1>
        <RegistrationSucces successMessage={success} />
        <FormErrors error={error} />
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
          onClick={onSubmit}
        >
          <Trans i18nKey="registration.button">Register</Trans>
        </Button>
        <div className={classes.loginLink}>
          <Trans i18nKey="registration.loginLink">
            Already have an account? <Link to="/login">Sign in!</Link>
          </Trans>
        </div>
        <div>
          <div onClick={() => handleChangeAppLanguage('ro')} className={classesLogin.flags}>
            <Avatar alt="RO" variant="square" className={classesLogin.small} src={RO} />
          </div>
          <div onClick={() => handleChangeAppLanguage('en')} className={classesLogin.flags}>
            <Avatar alt="EN" variant="square" className={classesLogin.small} src={EN} />
          </div>
        </div>
      </FormGroup>
    </div>
  );
};
export default RegistrationDumb;
