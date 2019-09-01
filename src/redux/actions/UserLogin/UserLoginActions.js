import { USER_LOGIN } from '../actionTypes';

export const UserLogin_onSuccess = payload => ({
    type: USER_LOGIN.SUCCESS,
    payload
});

export const UserLogin_onError = payload => ({
    type: USER_LOGIN.ERROR,
    payload
});

export const UserLogin_logOut = () => ({
    type: USER_LOGIN.LOGOUT
});