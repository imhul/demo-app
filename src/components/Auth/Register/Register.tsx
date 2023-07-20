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
    const { registerRequest, registerError, registerStep } =
        useSelector((s: any) => s.auth);
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
                headerStyle={{
                    borderBottom: 'none',
                    justifyContent: 'flex-end'
                }}
                width="100%"
            >
                <div className="modal-content">
                    <SuccessIcon />
                    <p>
                        Аккаунт был успешно зарегистрирован.
                        <br />
                        На ваш E-Mail отправлено письмо со ссылкой для
                        подтверждения
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
                <Row gutter={24} className="register">
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
                                type="email"
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
                                    min: 8,
                                    max: 14,
                                    required: true,
                                    whitespace: true,
                                    message:
                                        'Длина пароля должна быть не менее 8 и не более 14 символов'
                                },
                                {
                                    required: true,
                                    message: 'Обязательное поле'
                                },
                                {
                                    message:
                                        'Буквенная часть пароля должна содержать как строчные, так и прописные (заглавные) буквы',
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])/
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
                                    min: 8,
                                    max: 14,
                                    required: true,
                                    whitespace: true,
                                    message:
                                        'Длина пароля должна быть не менее 8 и не более 14 символов'
                                },
                                {
                                    required: true,
                                    message: 'Обязательное поле'
                                },
                                {
                                    message:
                                        'Буквенная часть пароля должна содержать как строчные, так и прописные (заглавные) буквы',
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])/
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
                            disabled={registerRequest}
                            shape="round"
                            type="primary"
                            htmlType="submit"
                            onClick={submit}
                            block
                        >
                            {registerRequest ? (
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
