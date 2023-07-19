import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { types } from 'redux/types';

interface Action {
    type: string;
    payload: any;
}

const initState = {
    // ui
    initialized: false,
    isLoginTab: true,
    // auth data
    user: {},
    token: '',
    // login
    isLoggedIn: false,
    loginRequest: false,
    loginError: false,
    // profile create
    isProfileCreated: false,
    profileCreateRequest: false,
    profileCreateError: false,
    // registration
    isRegistered: false,
    registerRequest: false,
    registerError: false,
    registerStep: 1,
    // confirm email
    isConfirmEmail: false,
    // confirm phone
    isConfirmPhone: false,
    // reset password
    isResetPassword: false,
    // forgot password
    isForgotPassword: false
};

const authReducer = (state = initState, action: Action) => {
    switch (action.type) {
        // ui
        case types.INITIALIZE:
            return {
                ...state,
                initialized: true
            };

        case types.SET_AUTH_TAB:
            return {
                ...state,
                isLoginTab: !state.isLoginTab
            };

        // login
        case types.USER_LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true
            };

        case types.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loginRequest: false,
                loginError: false,
                isLoggedIn: true
            };

        case types.USER_LOGIN_FAIL:
            return {
                ...state,
                loginRequest: false,
                isLoggedIn: false,
                loginError: true
            };

        // register
        case types.USER_REGISTER_REQUEST:
            return {
                ...state,
                registerRequest: true
            };

        case types.USER_REGISTER_SUCCESS:
            return {
                ...state,
                token: action.payload,
                registerRequest: false,
                registerError: false,
                isRegistered: true,
                registerStep: 2
            };

        case types.USER_REGISTER_FAIL:
            return {
                ...state,
                registerRequest: false,
                isRegistered: false,
                registerError: true
            };

        case types.SET_REGISTER_STEP:
            return {
                ...state,
                registerStep: action.payload
            };

        // profile create
        case types.USER_CREATE_PROFILE_REQUEST:
            return {
                ...state,
                profileCreateRequest: true
            };

        case types.USER_CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                profileCreateRequest: false,
                profileCreateError: false,
                isProfileCreated: true,
                registerStep: 4
            };

        case types.USER_CREATE_PROFILE_FAIL:
            return {
                ...state,
                profileCreateRequest: false,
                isProfileCreated: false,
                profileCreateError: true
            };

        // auth
        case types.SET_USER_TOKEN:
            return {
                ...state,
                token: action.payload
            };

        case types.SET_USER:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
};

export default (history: History) =>
    combineReducers({
        auth: authReducer,
        router: connectRouter(history)
    });
