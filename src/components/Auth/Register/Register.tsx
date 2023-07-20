import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Row, Col, Drawer, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
// assets
import { ReactComponent as SuccessIcon } from 'assets/success.svg';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
// utils
import CriptoJs from 'crypto-js';

const FormItem = Form.Item;
const Password = Input.Password;

const Register = () => {
    const {
        registerRequest,
        registerError,
        profileCreateRequest,
        registerStep,
    } = useSelector((s: any) => s.auth);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalWasShown, setModalWasShown] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const error = 'Ошибка при регистрации!';

    const submit = () => {
        const values = form.getFieldsValue();
        dispatch({
            type: 'USER_REGISTER_REQUEST',
            payload: {
                email: values.email,
                password: CriptoJs.MD5(values.password).toString(),
                ref: '/email-confirm'
            }
        });
    };

    useEffect(() => {
        if (registerError) {
            messageApi.error(error);
        }
    }, []);

    useEffect(() => {
        const disabled = registerRequest || profileCreateRequest;
        setSubmitDisabled(disabled);
    }, [registerRequest, profileCreateRequest]);

    useEffect(() => {
        if (!modalOpen && !modalWasShown && registerStep === 2) {
            setModalOpen(true);
            setModalWasShown(true);
            form.resetFields();
        }
    }, [modalOpen, modalWasShown, registerStep]);

    const onModalClose = () => {
        setModalOpen(false);
        dispatch({ type: 'SET_REGISTER_STEP', payload: 1 });
    };

    return (
        <>
            {contextHolder}
            <Drawer
                rootClassName="register-modal"
                maskClosable={false}
                destroyOnClose
                placement="left"
                onClose={onModalClose}
                open={modalOpen}
                closeIcon={<CloseIcon />}
                headerStyle={{ borderBottom: 'none', justifyContent: 'flex-end' }}
                width="100%"
            >
                <div className="modal-content">
                    <SuccessIcon />
                    <p>
                        Аккаунт был успешно зарегистрирован.<br />
                        На ваш E-Mail отправлено письмо со ссылкой для подтверждения
                    </p>
                </div>
            </Drawer>

            <Form
                form={form}
                className="auth-form"
                name="register-form"
                layout="vertical"
                requiredMark={false}
                size="large"
            >
                <Row gutter={24} className="Register">
                    <Col span={24}>
                        <FormItem
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    min: 8,
                                    type: 'email',
                                    whitespace: true,
                                    message: ''
                                },
                                {
                                    required: true,
                                    message: 'Обязательное поле'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Адрес эл. почты"
                                autoComplete="email"
                            />
                        </FormItem>
                    </Col>
                    {/* password */}
                    <Col span={24}>
                        <FormItem
                            name="password"
                            label="Придумайте пароль"
                            hasFeedback
                            rules={[
                                {
                                    min: 6,
                                    required: true,
                                    whitespace: true,
                                    message: 'Обязательное поле'
                                }
                            ]}
                        >
                            <Password
                                autoComplete="new-password"
                                placeholder="Укажите ваш пароль"
                            />
                        </FormItem>
                    </Col>
                    {/* confirm password */}
                    <Col span={24}>
                        <FormItem
                            name="confirm-password"
                            label="Повторите пароль"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    min: 6,
                                    required: true,
                                    whitespace: true,
                                    message: 'Обязательное поле'
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue(
                                                'password'
                                            ) === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'Паролі не співпадають!'
                                            )
                                        );
                                    }
                                })
                            ]}
                        >
                            <Password
                                autoComplete="new-password"
                                placeholder="Повторите ваш пароль"
                            />
                        </FormItem>
                    </Col>

                    <Col span={24}>
                        <Button
                            disabled={submitDisabled}
                            shape="round"
                            type="primary"
                            htmlType="submit"
                            onClick={submit}
                            block
                        >
                            {submitDisabled ? (
                                <SyncOutlined
                                    rotate={180}
                                    className="grey-main"
                                />
                            ) : (
                                'Зарегистрироваться'
                            )}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Register;
