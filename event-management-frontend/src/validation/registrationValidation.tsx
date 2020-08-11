
  export const validateEmail=(email: string, emailError:string, setEmailError: (arg0: string) => void) => {
    if (email.trim() === "" || (/^[a-zA-Z0-9_.\-$]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
      return false;
    }

    if (!emailError) {
      setEmailError("Enter a valid email address");
    }
    return true;
  }

  export const validatePassword=(password:string, passwordError:string, setPasswordError: (arg0: string) => void) => {
    if (password.trim() === "" || (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password))) {
      return false;
    }

    if (!passwordError) {
      setPasswordError("Requirements: min. 8 characters, an uppercase letter and a number")
    }
    return true;
  }

  export const validateConfirmPassword=(password:string, confirmPassword: string, confirmPasswordError: string, setConfirmPasswordError: (arg0: string) => void) => {
    if (confirmPassword.trim() === "" || confirmPassword === password) {
      return false;
    }
    
    if (!confirmPasswordError) {
      setConfirmPasswordError("The passwords do not match.");
    }
    return true;
  }
