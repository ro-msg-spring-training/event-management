import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { AppState } from '../../store/store';
import { Dispatch } from 'redux';
import {
  registrationisLoading,
  registrationError,
  registrationSuccess,
  registrationFirstName,
  registrationLastName,
  registrationEmail,
  registrationUsername,
  registrationPassword,
  registrationConfirmPassword,
} from '../../actions/RegistrationPageActions';
import { connect } from 'react-redux';
import {
  validateFirstName,
  validateLastName,
  validateUserName,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  displayUsernameError,
  displayErrorMessage,
  displaySuccessMessage,
} from '../../validation/RegistrationValidation';
import { Trans } from 'react-i18next';
import RegistrationDumb from './RegistrationDumb';

interface Props {
  isLoading: boolean;
  error: string;
  success: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  registrationisLoading: (isLoading: boolean) => void;
  registrationError: (error: string) => void;
  registrationSuccess: (succes: string) => void;
  registrationFirstName: (firstName: string) => void;
  registrationLastName: (lastName: string) => void;
  registrationEmail: (email: string) => void;
  registrationUsername: (username: string) => void;
  registrationPassword: (password: string) => void;
  registrationConfirmPassword: (confirmPassword: string) => void;
}

const Registration = ({
  isLoading,
  error,
  success,
  firstName,
  lastName,
  email,
  username,
  password,
  confirmPassword,
  registrationisLoading,
  registrationError,
  registrationSuccess,
  registrationFirstName,
  registrationLastName,
  registrationEmail,
  registrationUsername,
  registrationPassword,
  registrationConfirmPassword,
}: Props) => {
  const [values, setValues] = useState<{ showPassword: boolean }>({
    showPassword: false,
  });

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };
  const onSubmit = async () => {
    registrationisLoading(true);
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

      registrationError('');
      displaySuccessMessage(
        <Trans i18nKey="registration.successMessage">Registration successful</Trans>,
        registrationSuccess
      );
    } catch (error) {
      switch (error.code) {
        case 'UsernameExistsException':
          displayUsernameError(<Trans i18nKey="registration.userExists">User already exists</Trans>, setUsernameError);
          displayErrorMessage(<Trans i18nKey="registration.userExists">User already exists</Trans>, registrationError);
          break;
      }
    }
  };
  return (
    <RegistrationDumb
      error={error}
      success={success}
      values={values}
      firstName={firstName}
      lastName={lastName}
      email={email}
      username={username}
      password={password}
      confirmPassword={confirmPassword}
      firstNameError={firstNameError}
      lastNameError={lastNameError}
      emailError={emailError}
      usernameError={usernameError}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      setFirstName={registrationFirstName}
      setLastName={registrationLastName}
      setEmail={registrationEmail}
      setUsername={registrationUsername}
      setPassword={registrationPassword}
      setConfirmPassword={registrationConfirmPassword}
      setFirstNameError={setFirstNameError}
      setLastNameError={setLastNameError}
      setEmailError={setEmailError}
      setUsernameError={setUsernameError}
      setPasswordError={setPasswordError}
      setConfirmPasswordError={setConfirmPasswordError}
      handleClickShowPassword={handleClickShowPassword}
      onSubmit={onSubmit}
    ></RegistrationDumb>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.registration.isLoading,
  error: state.registration.error,
  succes: state.registration.success,
  firstName: state.registration.firstName,
  lastName: state.registration.lastName,
  email: state.registration.email,
  username: state.registration.username,
  password: state.registration.password,
  confirmPassword: state.registration.confirmPassword,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registrationisLoading: (loadingStatus: boolean) => dispatch(registrationisLoading(loadingStatus)),
  registrationError: (error: string) => dispatch(registrationError(error)),
  registrationSuccess: (success: string) => dispatch(registrationSuccess(success)),
  registrationFirstName: (firstName: string) => dispatch(registrationFirstName(firstName)),
  registrationLastName: (lastName: string) => dispatch(registrationLastName(lastName)),
  registrationEmail: (email: string) => dispatch(registrationEmail(email)),
  registrationUsername: (username: string) => dispatch(registrationUsername(username)),
  registrationPassword: (password: string) => dispatch(registrationPassword(password)),
  registrationConfirmPassword: (confirmPassword: string) => dispatch(registrationConfirmPassword(confirmPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
