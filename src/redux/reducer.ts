import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { types } from 'redux/types';

interface Action {
    type: string;
    payload: any;
    meta?: any;
}

const initState = {
    // ui
    initialized: false,
    isLoginTab: true,
    // user
    user: {
        email: '',
        phone: ''
    },
    getUserInfoRequest: false,
    getUserInfoError: false,
    getUserInfoSuccess: false,
    // auth data
    token: '',
    resetToken: '',
    resetTemporaryToken: '',
    // login / logout
    isLoggedIn: false,
    loginRequest: false,
    loginError: false,
    logoutRequest: false,
    logoutError: false,
    // profile create
    isProfileCreated: false,
    profileCreateRequest: false,
    profileCreateError: false,
    // profile update
    isProfileUpdated: false,
    profileUpdateRequest: false,
    profileUpdateError: false,
    // registration
    isRegistered: false,
    registerRequest: false,
    registerError: false,
    registerStep: 1,
    // confirm email
    isEmailConfirmed: false,
    emailConformRequest: false,
    emailConformError: false,
    // confirm phone
    isSmsSended: false,
    isPhoneConfirmed: false,
    confirmSendSmsRequest: false,
    confirmSendSmsError: false,
    confirmPhoneRequest: false,
    confirmPhoneError: false,
    // reset password
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordError: false,
    // forgot password
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: false,
    // reset password confirm phone
    resetPasswordConfirmPhoneRequest: false,
    resetPasswordConfirmPhoneSuccess: false,
    resetPasswordConfirmPhoneError: false
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
                isLoggedIn: true,
                user: action.payload
            };

        case types.USER_LOGIN_FAIL:
            return {
                ...state,
                loginRequest: false,
                isLoggedIn: false,
                loginError: true
            };

        // logout
        case types.USER_LOGOUT_REQUEST:
            return {
                ...state,
                logoutRequest: true
            };

        case types.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                logoutRequest: false,
                isRegistered: false,
                logoutError: false,
                isLoggedIn: false,
                token: ''
            };

        case types.USER_LOGOUT_FAIL:
            return {
                ...state,
                logoutRequest: false,
                logoutError: true,
                isLoggedIn: true
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
                registerStep: 2,
                user: {
                    ...state.user,
                    email: action.meta
                }
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

        // profile update
        case types.USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                profileUpdateRequest: true
            };

        case types.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profileUpdateRequest: false,
                profileUpdateError: false,
                isProfileUpdated: true,
                user: action.payload
            };

        case types.USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                profileUpdateRequest: false,
                isProfileUpdated: false,
                profileUpdateError: true
            };

        // confirm email
        case types.USER_CONFIRM_EMAIL_REQUEST:
            return {
                ...state,
                emailConformRequest: true
            };

        case types.USER_CONFIRM_EMAIL_SUCCESS:
            return {
                ...state,
                emailConformRequest: false,
                emailConformError: false,
                isEmailConfirmed: true,
                isLoggedIn: true
            };

        case types.USER_CONFIRM_EMAIL_FAIL:
            return {
                ...state,
                isEmailConfirmed: false,
                emailConformRequest: false,
                emailConformError: true
            };

        // confirm phone
        case types.USER_CONFIRM_SEND_SMS_REQUEST:
            return {
                ...state,
                confirmSendSmsRequest: true
            };

        case types.USER_CONFIRM_SEND_SMS_SUCCESS:
            return {
                ...state,
                confirmSendSmsRequest: false,
                confirmSendSmsError: false,
                isSmsSended: true
            };

        case types.USER_CONFIRM_SEND_SMS_FAIL:
            return {
                ...state,
                isSmsSended: false,
                confirmSendSmsRequest: false,
                confirmSendSmsError: true
            };

        case types.PREPARE_TO_RESEND_SMS:
            return {
                ...state,
                isSmsSended: false
            };

        case types.USER_CONFIRM_PHONE_REQUEST:
            return {
                ...state,
                confirmPhoneRequest: true
            };

        case types.USER_CONFIRM_PHONE_SUCCESS:
            return {
                ...state,
                confirmPhoneRequest: false,
                confirmPhoneError: false,
                isPhoneConfirmed: true
            };

        case types.USER_CONFIRM_PHONE_FAIL:
            return {
                ...state,
                isPhoneConfirmed: false,
                confirmPhoneRequest: false,
                confirmPhoneError: true
            };

        // auth
        case types.SET_USER_TOKEN:
            return {
                ...state,
                token: action.payload
            };

        case types.SET_RESET_TOKEN:
            return {
                ...state,
                resetToken: action.payload
            };

        case types.SET_RESET_TEMPORARY_TOKEN:
            return {
                ...state,
                resetTemporaryToken: action.payload
            };

        // user
        case types.SET_USER:
            return {
                ...state,
                user: action.payload
            };

        case types.GET_USER_INFO_REQUEST:
            return {
                ...state,
                getUserInfoRequest: true
            };

        case types.GET_USER_INFO_SUCCESS:
            return {
                user: action.payload,
                getUserInfoSuccess: true,
                getUserInfoRequest: false,
                getUserInfoError: false
            };

        case types.GET_USER_INFO_FAIL:
            return {
                ...state,
                getUserInfoRequest: false,
                getUserInfoSuccess: false,
                getUserInfoError: true
            };

        // password
        case types.USER_FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                isForgotPassword: true
            };

        case types.USER_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false,
                forgotPasswordError: false
            };

        case types.USER_FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                forgotPasswordSuccess: false,
                forgotPasswordRequest: false,
                forgotPasswordError: true
            };

        case types.USER_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetPasswordRequest: true
            };

        case types.USER_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordRequest: false,
                resetPasswordError: false
            };

        case types.USER_RESET_PASSWORD_FAIL:
            return {
                ...state,
                resetPasswordSuccess: false,
                resetPasswordRequest: false,
                resetPasswordError: true
            };

        case types.USER_RESET_PASSWORD_CONFIRM_PHONE_REQUEST:
            return {
                ...state,
                resetPasswordConfirmPhoneRequest: true
            };

        case types.USER_RESET_PASSWORD_CONFIRM_PHONE_SUCCESS:
            return {
                ...state,
                resetPasswordConfirmPhoneRequest: false,
                resetPasswordConfirmPhoneSuccess: true,
                resetPasswordConfirmPhoneError: false,
                resetToken: action.payload
            };

        case types.USER_RESET_PASSWORD_CONFIRM_PHONE_FAIL:
            return {
                ...state,
                resetPasswordConfirmPhoneRequest: false,
                resetPasswordConfirmPhoneSuccess: false,
                resetPasswordConfirmPhoneError: true
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
