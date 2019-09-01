import { USER_LOGIN } from '../../actions/actionTypes';

const defaultState = {
    googleUser: {},
    googleAuthToken: {},
    awsFederatedInfo: {},
    signInFailedReason: ''
};

export default function UserLoginReducer(state = defaultState, action) {
  switch (action.type) {
    case USER_LOGIN.SUCCESS:
      return {
        ...state,
        googleUser: action.payload.googleUser,
        googleAuthToken: action.payload.googleAuthToken
      };
    case USER_LOGIN.ERROR:
      return {
        ...state,
        signInFailedReason: action.payload.signInFailedReason
      };
    case USER_LOGIN.LOGOUT:
      return { ...defaultState }; // reset to default state on logout
    default:
      return state;
  }
}