import { RegistrationAction, RegistrationActionTypes } from '../actions/RegistrationPageActions';

export interface RegistrationPageState {
  isLoading: boolean;
  error: string;
  success: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialState: RegistrationPageState = {
  isLoading: true,
  error: '',
  success: '',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

export const RegistrationPageReducer = (
  state: RegistrationPageState = initialState,
  action: RegistrationAction
): RegistrationPageState => {
  switch (action.type) {
    case RegistrationActionTypes.REGISTRATION_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }

    case RegistrationActionTypes.REGISTRATION_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }

    case RegistrationActionTypes.REGISTRATION_SUCCESS: {
      return {
        ...state,
        success: action.success,
      };
    }

    case RegistrationActionTypes.FIRST_NAME_INPUT: {
      return {
        ...state,
        firstName: action.firstName,
      };
    }

    case RegistrationActionTypes.LAST_NAME_INPUT: {
      return {
        ...state,
        lastName: action.lastName,
      };
    }

    case RegistrationActionTypes.EMAIL_INPUT: {
      return {
        ...state,
        email: action.email,
      };
    }

    case RegistrationActionTypes.USERNAME_INPUT: {
      return {
        ...state,
        username: action.username,
      };
    }

    case RegistrationActionTypes.PASSWORD_INPUT: {
      return {
        ...state,
        password: action.password,
      };
    }

    case RegistrationActionTypes.CONFIRM_PASSWORD_INPUT: {
      return {
        ...state,
        confirmPassword: action.confirmPassword,
      };
    }

    default:
      return state;
  }
};

export default RegistrationPageReducer;
