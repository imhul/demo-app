import axios from 'axios';
// types
import {
    ResetPasswordConfirmPhoneRequest,
    ForgotPasswordByEmailRequest,
    RegistrationRequest,
    ConfirmEmailRequest,
    ResetPasswordRequest,
    LoginRequest,
    EmailRequest,
    ProfileCreatePayload,
    ConfirmPhonePayload,
    UpdateProfilePayload
} from 'interfaces';

const base = 'https://api.prof.world/v2.0/profile/';

const url = {
    login: base + 'loginUser',
    logout: base + 'logoutUser',
    getUser: base + 'get_userInfo',
    register: base + 'registration',
    profileCreate: base + 'profileCreate',
    updateProfile: base + 'updateProfile',
    confirmEmail: base + 'confirmEmail',
    confirmPhome: base + 'confirmPhone',
    sendSms: base + 'confirmPhoneSendSms',
    // reset password
    resetPassword: base + 'resetPassword',
    resetPasswordRedirect: base + 'resetPasswordRedirect',
    resetPasswordConfirmPhone: base + 'resetPasswordConfirmPhone',
    forgotPassword: base + 'forgotPassword'
};

export const config = {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const GETconfig = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    }
};

const getAuthConfig = (token: string) => ({
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        userToken: token
    }
});

export const loginUser = async ({
    login,
    password
}: LoginRequest) => {
    const isEmail = login.includes('@');

    return await axios({
        ...config,
        url: url.login,
        data: isEmail
            ? {
                  email: login,
                  password
              }
            : {
                  phone: login,
                  password
              }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const logoutUser = async (token: string) => {
    const authConfig = getAuthConfig(token);

    return await axios({
        ...authConfig,
        url: url.logout
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const register = async (data: RegistrationRequest) => {
    return await axios({
        ...config,
        url: url.register,
        data
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const profileCreate = async ({
    data,
    token
}: ProfileCreatePayload) => {
    const authConfig = getAuthConfig(token);

    return await axios({
        ...authConfig,
        url: url.profileCreate,
        data
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const emailConfirm = async ({
    ref,
    token
}: ConfirmEmailRequest) => {
    return await axios({
        ...GETconfig,
        url: url.confirmEmail,
        data: { ref, token }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const sendSms = async (phone: string) => {
    return await axios({
        ...config,
        url: url.sendSms,
        data: { phone }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const phoneConfirm = async ({
    code,
    token
}: ConfirmPhonePayload) => {
    const authConfig = getAuthConfig(token);

    return await axios({
        ...authConfig,
        url: url.confirmPhome,
        data: { confirm_phone_code: code }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const getUser = async (token: string) => {
    const authConfig = getAuthConfig(token);

    return await axios({
        ...authConfig,
        url: url.getUser
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const updateProfile = async ({
    token,
    data
}: UpdateProfilePayload) => {
    const authConfig = getAuthConfig(token);

    return await axios({
        ...authConfig,
        url: url.updateProfile,
        data
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const forgotPasswordByEmail = async (
    data: ForgotPasswordByEmailRequest
) => {
    return await axios({
        ...config,
        url: url.forgotPassword,
        data
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const forgotPasswordByPhone = async (phone: string) => {
    return await axios({
        ...config,
        url: url.forgotPassword,
        data: { phone }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const resetPassword = async ({
    data,
    token
}: ResetPasswordRequest) => {
    const authConfig = getAuthConfig(token);

    return await axios({
        ...authConfig,
        url: url.resetPassword,
        data
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const resetPasswordRedirect = async (data: EmailRequest) => {
    return await axios({
        ...GETconfig,
        url: url.resetPasswordRedirect,
        data
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};

export const resetPasswordConfirmPhone = async (
    data: ResetPasswordConfirmPhoneRequest
) => {
    return await axios({
        ...config,
        url: url.resetPasswordConfirmPhone,
        data
    })
        .then(
            response => response.data.user_data.reset_password_token
        )
        .catch(error => {
            console.error(error);
        });
};
