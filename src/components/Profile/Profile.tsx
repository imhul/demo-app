import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Row, Col, Drawer, message } from 'antd';

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const {
        isRegistered,
        isProfileCreated,
        registerStep,
        token
    } = useSelector((s: any) => s.auth);

    useEffect(() => {
        if (
            isRegistered &&
            token &&
            !isProfileCreated &&
            registerStep === 3
        ) {
            dispatch({
                type: 'USER_CONFIRM_EMAIL_REQUEST',
                payload: {
                    token,
                    ref: '/profile',
                }
            });
        }
    }, []);

    const submit = useCallback(() => {
        const values = form.getFieldsValue();

        dispatch({
            type: 'USER_CREATE_PROFILE_REQUEST',
            payload: {
                token,
                // TODO: add form values
                data: {
                    birth_date: '',
                    lname: '',
                    name: '',
                    sname: '',
                    phone: '',
                    gender_id: 0
                }
            }
        });
    }, [isRegistered, isProfileCreated, registerStep, token]);

    return (
        <div>
            Profile Form
        </div>
    );
}

export default Profile;