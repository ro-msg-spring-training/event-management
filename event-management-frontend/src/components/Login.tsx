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
import { useHistory } from 'react-router-dom';
import useStylesLogin from '../styles/loginStyle';
import { useStyles } from '../styles/CommonStyles';
import { FormErrors } from './FormErrors';
import { validatePassword } from '../validation/LoginValidation';
import { SuccessMessage } from './SuccessMessage';
import '../styles/LoginCss.css';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Login = () => {
  const [isLoading, setisLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classesLogin = useStylesLogin();
  const classes = useStyles();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [values, setValues] = React.useState<{ showPassword: boolean }>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const onSubmit = async () => {
    setisLoading(true);
    try {
      const user = await Auth.signIn(username, password);
      setSuccess('Succesful login');
      setError('');
    } catch (e) {
      setError(e.message);
      if (validatePassword(password, username)) {
        setError('Password cannot be empty');
      }
      setisLoading(false);
    }
  };

  return (
    <div className={classesLogin.root}>
      <FormGroup className={`${classesLogin.loginform} loginformResponsive`}>
        <h1 className={classes.typography}>Login</h1>
        <div className={classesLogin.successDiv}>
          <SuccessMessage success={success} />
        </div>
        <TextField
          className={classesLogin.loginformItems}
          label="Username"
          type="text"
          value={username}
          required
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormControl className={classesLogin.loginformItems} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
              Forgot password?
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
          Login
        </Button>

        <div className="field">
          <p className="control">
            Don't have an account?
            <a href="/register" className={classesLogin.link}>
              Register here
            </a>
          </p>
        </div>
      </FormGroup>
    </div>
  );
};

export default Login;
