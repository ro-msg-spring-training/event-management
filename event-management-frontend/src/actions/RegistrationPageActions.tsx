export enum RegistrationActionTypes {
  REGISTRATION_LOADING = 'REGISTRATION_LOADING',
  REGISTRATION_ERROR = 'REGISTRATION_ERROR',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  FIRST_NAME_INPUT = 'FIRST_NAME_INPUT',
  LAST_NAME_INPUT = 'LAST_NAME_INPUT',
  EMAIL_INPUT = 'EMAIL_INPUT',
  USERNAME_INPUT = 'USERNAME_INPUT',
  PASSWORD_INPUT = 'PASSWORD_INPUT',
  CONFIRM_PASSWORD_INPUT = 'CONFIRM_PASSWORD_INPUT',
}

export class RegistrationLoadingStatusAction {
  public readonly type = RegistrationActionTypes.REGISTRATION_LOADING;
  public loadingStatus: boolean;

  constructor(loadingStatus: boolean) {
    this.loadingStatus = loadingStatus;
  }
}

export class RegistrationErrorAction {
  public readonly type = RegistrationActionTypes.REGISTRATION_ERROR;
  public errorStatus: string;

  constructor(errorStatus: string) {
    this.errorStatus = errorStatus;
  }
}

export class RegistrationSuccessAction {
  public readonly type = RegistrationActionTypes.REGISTRATION_SUCCESS;
  public success: string;

  constructor(success: string) {
    this.success = success;
  }
}

export class RegistrationUpdateFirstNameAction {
  public readonly type = RegistrationActionTypes.FIRST_NAME_INPUT;
  public firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}

export class RegistrationUpdateLastNameAction {
  public readonly type = RegistrationActionTypes.LAST_NAME_INPUT;
  public lastName: string;

  constructor(lastName: string) {
    this.lastName = lastName;
  }
}

export class RegistrationUpdateEmailAction {
  public readonly type = RegistrationActionTypes.EMAIL_INPUT;
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export class RegistrationUpdateUsernameAction {
  public readonly type = RegistrationActionTypes.USERNAME_INPUT;
  public username: string;

  constructor(username: string) {
    this.username = username;
  }
}

export class RegistrationUpdatePasswordAction {
  public readonly type = RegistrationActionTypes.PASSWORD_INPUT;
  public password: string;

  constructor(password: string) {
    this.password = password;
  }
}

export class RegistrationUpdateConfirmPasswordAction {
  public readonly type = RegistrationActionTypes.CONFIRM_PASSWORD_INPUT;
  public confirmPassword: string;

  constructor(confirmPassword: string) {
    this.confirmPassword = confirmPassword;
  }
}

export type RegistrationAction =
  | RegistrationLoadingStatusAction
  | RegistrationErrorAction
  | RegistrationSuccessAction
  | RegistrationUpdateFirstNameAction
  | RegistrationUpdateLastNameAction
  | RegistrationUpdateEmailAction
  | RegistrationUpdateUsernameAction
  | RegistrationUpdatePasswordAction
  | RegistrationUpdateConfirmPasswordAction;

export const registrationisLoading = (loadingStatus: boolean): RegistrationLoadingStatusAction => {
  return {
    type: RegistrationActionTypes.REGISTRATION_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const registrationError = (errorStatus: string): RegistrationErrorAction => {
  return {
    type: RegistrationActionTypes.REGISTRATION_ERROR,
    errorStatus: errorStatus,
  };
};

export const registrationSuccess = (success: string): RegistrationSuccessAction => {
  return {
    type: RegistrationActionTypes.REGISTRATION_SUCCESS,
    success: success,
  };
};

export const registrationFirstName = (firstName: string): RegistrationUpdateFirstNameAction => {
  return {
    type: RegistrationActionTypes.FIRST_NAME_INPUT,
    firstName: firstName,
  };
};

export const registrationLastName = (lastName: string): RegistrationUpdateLastNameAction => {
  return {
    type: RegistrationActionTypes.LAST_NAME_INPUT,
    lastName: lastName,
  };
};

export const registrationEmail = (email: string): RegistrationUpdateEmailAction => {
  return {
    type: RegistrationActionTypes.EMAIL_INPUT,
    email: email,
  };
};

export const registrationUsername = (username: string): RegistrationUpdateUsernameAction => {
  return {
    type: RegistrationActionTypes.USERNAME_INPUT,
    username: username,
  };
};

export const registrationPassword = (password: string): RegistrationUpdatePasswordAction => {
  return {
    type: RegistrationActionTypes.PASSWORD_INPUT,
    password: password,
  };
};

export const registrationConfirmPassword = (confirmPassword: string): RegistrationUpdateConfirmPasswordAction => {
  return {
    type: RegistrationActionTypes.CONFIRM_PASSWORD_INPUT,
    confirmPassword: confirmPassword,
  };
};
