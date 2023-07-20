import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PhoneConfirm = () => {
    const { token, registerStep, isRegistered } = useSelector((s: any) => s.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if ((registerStep === 3 || registerStep === 4 ) && token?.length && isRegistered) {
            dispatch({
                type: 'USER_CONFIRM_PHONE_REQUEST',
                payload: {
                    token,
                    ref: '/profile'
                }
            });
        }
    }, [token, registerStep, isRegistered]);

    return (
        // TODO: phone confirm form with code (from sms) input +
        // re-send code button +
        // confirm submit button +
        // back to profile button
    );
};

export default PhoneConfirm;

