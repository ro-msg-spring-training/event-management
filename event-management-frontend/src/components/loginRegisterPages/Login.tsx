import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  FormGroup,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@material-ui/core';
import { useStyles } from '../../styles/CommonStyles';
import { FormErrors } from './FormErrors';
import { displayErrorMessage } from '../../validation/LoginValidation';
import { SuccessMessage } from './SuccessMessage';
import '../../styles/Responsivity.css';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Trans } from 'react-i18next';
import useStylesLogin from '../../styles/LoginStyle';
import { displaySuccessMessage } from '../../validation/RegistrationValidation';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [values, setValues] = React.useState<{ showPassword: boolean }>({
    showPassword: false,
  });

  const classesLogin = useStylesLogin();
  const classes = useStyles();
  const history = useHistory();

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const user = await Auth.signIn(username, password);
      localStorage.setItem('idToken', user.signInUserSession.idToken.jwtToken);
      localStorage.setItem('username', username);
      if (user.signInUserSession.accessToken.payload['cognito:groups'] !== undefined) {
        localStorage.setItem('role', 'admin');
        history.push('/admin/');
      } else {
        localStorage.setItem('role', 'user');
        history.push('/user/');
      }
      displaySuccessMessage(<Trans i18nKey="login.successMessage">Successful login</Trans>, setSuccess);
      setError('');
    } catch (error) {
      displayErrorMessage(<Trans i18nKey="login.errorMessage">Incorrect username or password.</Trans>, setError);
      setIsLoading(false);
    }
  };

  return (
    <div className={classesLogin.root}>
      <FormGroup className={`${classesLogin.loginform} loginformResponsive`}>
        <h1 className={classes.typography}>
          <Trans i18nKey="login.title">Login</Trans>
        </h1>

        <div className={classesLogin.successDiv}>
          <SuccessMessage success={success} />
        </div>

        <TextField
          className={classesLogin.loginformItems}
          label={<Trans i18nKey="login.username">Username</Trans>}
          type="text"
          value={username}
          required
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormControl className={classesLogin.loginformItems} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            <Trans i18nKey="login.password">Password</Trans>
          </InputLabel>
          <OutlinedInput
            labelWidth={80}
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <div className="field">
          <p className={classesLogin.alignLeftDiv}>
            <a href="/forgotpassword" className={classesLogin.link}>
              <Trans i18nKey="login.forgotPassword">Forgot password?</Trans>
            </a>
          </p>
        </div>

        <FormErrors error={error} />
        <Button
          variant="contained"
          type="submit"
          onClick={onSubmit}
          className={`${classes.buttonStyle2} ${classes.buttonStyle3} ${classesLogin.loginButton}`}
        >
          <Trans i18nKey="login.button">Login</Trans>
        </Button>

        <div className="field">
          <p className="control">
            <Trans i18nKey="login.registerLink">
              Don't have an account?
              <a href="/register" className={classesLogin.link}>
                Register here
              </a>
            </Trans>
          </p>
        </div>
      </FormGroup>
    </div>
  );
};

export default Login;
