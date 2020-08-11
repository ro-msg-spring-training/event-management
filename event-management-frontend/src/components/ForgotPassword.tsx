import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { FormGroup, TextField, Button } from '@material-ui/core';
import useStylesLogin from '../styles/loginStyle';
import { useStyles } from '../styles/CommonStyles';
import { useHistory } from 'react-router-dom';
import { validateEmail } from '../validation/LoginValidation';
import { FormErrors } from './FormErrors';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const classesLogin = useStylesLogin();
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState('');

  const onSubmit = async () => {
    try {
      await Auth.forgotPassword(email);
      history.push('/forgotpasswordverification');
    } catch (error) {
      setError(error.message);
    }
  };
  if (validateEmail(email) && emailError === '') {
    setEmailError('Enter a valid email address');
  }
  return (
    <div className={classesLogin.root}>
      <FormGroup>
        <h1 className={classes.typography}>Forgot your password?</h1>
        <p>Please enter the email address associated with your account and we'll email you a password reset link.</p>

        <TextField
          className={classesLogin.loginformItems}
          label="Email"
          type="email"
          value={email}
          required
          variant="outlined"
          helperText={emailError}
          error={emailError !== '' || validateEmail(email)}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
        />
        <FormErrors error={error} />
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

export default ForgotPassword;
