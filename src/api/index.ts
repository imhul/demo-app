import axios from 'axios';
// types
import {
    ProfileCreateRequest,
    RegistrationRequest,
    LoginRequest
} from 'interfaces';

interface ProfileCreateData {
    data: ProfileCreateRequest;
    token: string;
}

const base = 'https://api.prof.world/v2.0/profile/';

const url = {
    login: base + 'loginUser',
    register: base + 'registration',
    profileCreate: base + 'profileCreate',
    confirmEmail: base + 'confirmEmail',
    confirmPhome: base + 'confirmPhone',
    sendSms: base + 'confirmPhoneSendSms',
    resetPassword: base + 'resetPassword',
    forgotPassword: base + 'forgotPassword'
};

export const config = {
    method: 'post',
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
    }).then(response => {
        console.info('response data: ', response.data);
        console.info('response status: ', response.status);
        console.info('response statusText: ', response.statusText);

        return response.data;
    });
};

export const profileCreate = async ({
    data,
    token
}: ProfileCreateData) => {
    const authConfig = getAuthConfig(token);

    return await axios({
        ...authConfig,
        url: url.profileCreate,
        data
    })
        .then(response => {
            console.info('response data: ', response.data);
            console.info('response status: ', response.status);
            console.info(
                'response statusText: ',
                response.statusText
            );

            return response;
        })
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
        .then(response => {
            console.info('response data: ', response.data);
            console.info('response status: ', response.status);
            console.info(
                'response statusText: ',
                response.statusText
            );

            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
};
