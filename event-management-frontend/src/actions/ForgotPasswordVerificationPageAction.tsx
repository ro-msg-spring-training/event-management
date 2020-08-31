export enum VerificationActionTypes {
  EMAIL_INPUT = "EMAIL_INPUT",
  NEW_PASSWORD_INPUT = "NEW_PASSWORD_INPUT",
  VERIFICATION_CODE_INPUT = "VERIFICATION_CODE_INPUT",
  VERIFICATION_ERROR = "VERIFICATION_ERROR",
  VERIFICATION_LOADING = "VERIFICATION_LOADING",
}

export class VerificationLoadingStatusAction {
  public readonly type = VerificationActionTypes.VERIFICATION_LOADING;
  public loadingStatus: boolean;

  constructor(loadingStatus: boolean) {
    this.loadingStatus = loadingStatus;
  }
}

export class VerificationErrorAction {
  public readonly type = VerificationActionTypes.VERIFICATION_ERROR;
  public errorStatus: string;

  constructor(errorStatus: string) {
    this.errorStatus = errorStatus;
  }
}

export class VerificationUpdateNewPasswordAction {
  public readonly type = VerificationActionTypes.NEW_PASSWORD_INPUT;
  public password: string;

  constructor(password: string) {
    this.password = password;
  }
}

export class VerificationEmailAction {
  public readonly type = VerificationActionTypes.EMAIL_INPUT;
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}
export class VerificationCodeAction {
  public readonly type = VerificationActionTypes.VERIFICATION_CODE_INPUT;
  public code: string;

  constructor(code: string) {
    this.code = code;
  }
}

export type VerificationAction =
  | VerificationLoadingStatusAction
  | VerificationErrorAction
  | VerificationUpdateNewPasswordAction
  | VerificationEmailAction
  | VerificationCodeAction;

export const loginisLoading = (loadingStatus: boolean): VerificationLoadingStatusAction => {
  return {
    type: VerificationActionTypes.VERIFICATION_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const loginError = (errorStatus: string): VerificationErrorAction => {
  return {
    type: VerificationActionTypes.VERIFICATION_ERROR,
    errorStatus: errorStatus,
  };
};

export const loginPassword = (password: string): VerificationUpdateNewPasswordAction => {
  return {
    type: VerificationActionTypes.NEW_PASSWORD_INPUT,
    password: password,
  };
};

export const loginUsername = (email: string): VerificationEmailAction => {
  return {
    type: VerificationActionTypes.EMAIL_INPUT,
    email: email,
  };
};

export const loginSuccess = (code: string): VerificationCodeAction => {
  return {
    type: VerificationActionTypes.VERIFICATION_CODE_INPUT,
    code: code,
  };
};
