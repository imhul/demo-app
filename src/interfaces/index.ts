export interface UserData {
    id: number;
    token: string;
    is_confirm_email: number;
    is_confirm_phone: number;
    is_profile_created: number;
    email: string;
    phone: string;
    password: string;
    lname: string;
    name: string;
    sname: string;
    birth_date: string;
    reset_password_token?: string;
    confirm_phone_code?: string;
    gender_id?: number;
}

//--------------------------------------------------------

export interface ProfileCreatePayload {
    data: ProfileCreateRequest;
    token: string;
}

//--------------------------------------------------------
// API
// Requests

export interface LoginByEmailRequest {
    email: string;
    password: string;
}

export interface LoginByPhoneRequest {
    phone: string;
    password: string;
}

export interface LoginRequest {
    login: string;
    password: string;
}

export interface ConfirmEmailRequest {
    token: string;
    ref: string;
}

export interface ForgotPasswordByEmailRequest {
    email: string;
    ref: string;
}

export interface ForgotPasswordByPhoneRequest {
    phone: string;
}

export interface RegistrationRequest {
    email: string;
    password: string;
    ref: string;
}

export interface ResetPasswordRequest {
    new_password: string;
    reset_password_token: string;
}

export interface ConfirmPhoneSendSmsRequest {
    phone: string;
}

// Auth requests where header have the userToken !!

export interface ProfileCreateRequest {
    birth_date: string;
    lname: string;
    name: string;
    sname: string;
    phone: string;
    gender_id: number;
}

export interface ConfirmPhoneRequest {
    confirm_phone_code: string;
}

//--------------------------
// Responses

export interface BasicResponse {
    status: string; // "success",
    msg: string; // ""
}

export interface LoginResponse {
    status: string;
    msg: string;
    user_data: UserData;
}

export interface RegistrationResponse {
    status: string;
    msg: string;
    user_data: {
        token: string;
    };
}

export type ConfirmEmailResponse = BasicResponse;
export type ForgotPasswordResponse = BasicResponse;
export type ProfileCreateResponse = LoginResponse;
export type ResetPasswordResponse = BasicResponse;
export type ConfirmPhoneSendSmsResponse = BasicResponse;
