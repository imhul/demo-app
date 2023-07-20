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

export interface ConfirmPhonePayload {
    token: string;
    code: string;
}

export interface UpdateProfilePayload {
    data: UpdateProfileRequest;
    token: string;
}

//--------------------------------------------------------
// API
// Requests

export interface EmailRequest {
    email: string;
    ref: string;
}

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

export interface LogoutRequest {
    token: string;
}

export interface RegistrationRequest {
    email: string;
    password: string;
    ref: string;
}

export type ForgotPasswordByEmailRequest = EmailRequest;

export interface ForgotPasswordByPhoneRequest {
    phone: string;
}

export interface ResetPasswordRequest {
    data: {
        new_password: string;
        reset_password_token: string;
    };
    token: string;
}

export interface ResetPasswordConfirmPhoneRequest {
    phone: string;
    confirm_phone_code: string;
}

export interface ConfirmEmailRequest {
    token: string;
    ref: string;
}

export interface ConfirmPhoneSendSmsRequest {
    phone: string;
}

export interface UpdateProfileRequest {
    birth_date: string;
    lname: string;
    name: string;
    sname: string;
    gender_id: number;
    otherEmails: string[];
    otherPhones: string[];
    socials: string[];
    office_presence_status_id: number;
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

export interface ResetPasswordConfirmPhoneResponse {
    status: string;
    msg: string;
    user_data: {
        reset_password_token: string;
    };
}

export type ConfirmEmailResponse = BasicResponse;
export type ForgotPasswordResponse = BasicResponse;
export type ProfileCreateResponse = LoginResponse;
export type ResetPasswordResponse = BasicResponse;
export type ConfirmPhoneSendSmsResponse = BasicResponse;
