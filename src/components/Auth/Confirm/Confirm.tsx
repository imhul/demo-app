import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EmailConfirm = () => {
    const { token } = useSelector((s: any) => s.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'USER_CONFIRM_EMAIL_REQUEST',
            payload: {
                token,
                ref: '/profile',
            }})
    }, []);

    return (<></>);
};

export default EmailConfirm;
