import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { TextField, Button, FormGroup, FormControl, FormHelperText, InputLabel, InputAdornment, IconButton, OutlinedInput, ThemeProvider } from "@material-ui/core";
import { useStyles2 } from '../style/CommonStyles'
import { useStyles } from '../style/RegistrationPageStyle'
import { validateEmail, validatePassword, validateConfirmPassword } from '../validation/registrationValidation';
import { RegistrationSucces } from './RegistrationSuccess';
import { Link } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { themeDark } from '../style/Themes';

const RegisterPage =  () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [values, setValues] = React.useState<{showPassword: boolean}>({
      showPassword: false,
    });
    
    const classes = useStyles();
    const classes2 = useStyles2();

    const handleClickShowPassword = () => {
      setValues({ showPassword: !values.showPassword });
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      try {
        const user = await Auth.signUp({
          username: username,
          password: password,
          attributes: {
            given_name: firstName,
            family_name: lastName,
            email: email
          }
        });
        setSuccessMessage("Registration successful.");
      } catch (error) {
        setErrorMessage(error.message);
        switch (error.code) {
          case "InvalidPasswordException":
            setPasswordError(error.message);
            setConfirmPassword('');
            break;

          case "UsernameExistsException":
            setUsernameError(error.message);
            break;

          case "InvalidParameterException":
            switch(error.message) {
              case "Invalid email address format.":
                setEmailError(error.message);
                break;

              default:
                setPasswordError(error.message);
                setConfirmPassword('');
                break;
            }
        }
      }     
    }
    
    return (
      <ThemeProvider theme={themeDark}>
        <div className={classes.root}>
          <FormGroup className={`${classes.registrationform}`}> 
            <h1 className={` ${classes2.typography} ${classes.registrationTitle}`}>Registration</h1>
            <RegistrationSucces successMessage={successMessage}/>
            <FormErrors error={errorMessage}/>
            <br/>
            <TextField
              required
              variant="outlined"
              className={classes.registrationformItems}
              label="First Name"
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
            <TextField
              required
              variant="outlined"
              className={classes.registrationformItems}
              label="Last Name"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
            <TextField
              required
              variant="outlined"
              className={classes.registrationformItems}
              name='email'
              label="Email Address"
              value={email}
              onChange={event => { setEmail(event.target.value); setEmailError(''); }}
              error={validateEmail(email, emailError, setEmailError) || emailError !== ''}
              helperText={emailError}
            />
            <TextField
              required
              variant="outlined"
              className={classes.registrationformItems}
              label="Username"
              value={username}
              onChange={event => { setUsername(event.target.value); setUsernameError(''); }}
              error={usernameError != ''}
              helperText={usernameError}
            />
            <FormControl 
              required 
              variant="outlined"
              className={classes.registrationformItems} >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={values.showPassword ? 'text' : 'password'}
                  labelWidth={80}
                  value={password}
                  onChange={event => { setPassword(event.target.value); setPasswordError('') }}
                  error={validatePassword(password, passwordError, setPasswordError) || passwordError != ''}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end">
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{passwordError}</FormHelperText>
            </FormControl>
            <FormControl 
              required 
              variant="outlined"
              className={classes.registrationformItems}>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type="password"
                  labelWidth={145}
                  onPaste={() => {return false;}}
                  value={confirmPassword}
                  onChange={event => { setConfirmPassword(event.target.value); setConfirmPasswordError('') }}
                  error={validateConfirmPassword(password, confirmPassword, confirmPasswordError, setConfirmPasswordError)}
                />
                <FormHelperText>{confirmPasswordError}</FormHelperText>
            </FormControl>
            <Button variant="contained" className={`${classes2.buttonStyle2} ${classes2.buttonStyle3} ${classes.registrationButton}`} type='submit' onClick={handleSubmit}>Register</Button>
            <div className={classes.loginLink}>Already have an account?{' '}<Link to="/registration">Sign in!</Link></div>
          </FormGroup>
        </div>
      </ThemeProvider>
    );
  }


export default RegisterPage;