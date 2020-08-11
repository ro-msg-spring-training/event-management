export const validatePassword = (password: string, username: string) => {
  return password.length === 0 && username.length > 0;
};

export const validateEmail = (email: string) => {
  if (email.trim() === '' || /^[a-zA-Z0-9_.\-$]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    return false;
  } else {
    return true;
  }
};

export const validatePasswordRequirements = (password: string) => {
  if (password.trim() === '' || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    return false;
  } else {
    return true;
  }
};
