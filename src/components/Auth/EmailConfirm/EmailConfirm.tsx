import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Result } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const EmailConfirm = () => {
    const { token, isRegistered } = useSelector((s: any) => s.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token?.length && isRegistered) {
            dispatch({
                type: 'USER_CONFIRM_EMAIL_REQUEST',
                payload: {
                    token,
                    ref: '/profile'
                }
            });
        }
    }, [token, isRegistered]);

    return (
        <Result
            icon={<SyncOutlined spin className="primary" />}
            style={{
                position: 'absolute',
                top: '35%',
                width: '100%'
            }}
            title="Loading..."
        />
    );
};

export default EmailConfirm;
