import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const Password = Input.Password;

const Login = () => {
    const { loginRequest, loginError, isLoggedIn } = useSelector(
        (s: any) => s.auth
    );
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const error = 'Неверный логин или пароль';
    const success = 'Вы успешно авторизовались!';

    const submit = () => {
        const values = form.getFieldsValue();
        dispatch({
            type: 'USER_LOGIN_REQUEST',
            payload: values
        });
    };

    useEffect(() => {
        if (loginError) {
            form.setFields([
                {
                    name: 'login',
                    errors: [error]
                },
                {
                    name: 'password',
                    errors: [error]
                }
            ]);
        }
    }, [loginError]);

    useEffect(() => {
        if (isLoggedIn) {
            form.resetFields();
            messageApi.success(success);
        }
    }, [isLoggedIn]);

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                className="auth-form"
                name="login-form"
                layout="vertical"
                requiredMark={false}
                size="large"
            >
                <Row gutter={24} className="login">
                    <Col span={24}>
                        <FormItem
                            name="login"
                            label="E-mail или телефон"
                            rules={[
                                {
                                    min: 8,
                                    type: 'email',
                                    whitespace: true,
                                    message:
                                        'Введите корректный email'
                                },
                                {
                                    required: true,
                                    message: 'Обязательное поле'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Email"
                                autoComplete="email"
                            />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            name="password"
                            label="Пароль"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Обязательное поле'
                                }
                            ]}
                        >
                            <Password
                                placeholder="Пароль"
                                autoComplete="current-password"
                            />
                        </FormItem>
                    </Col>

                    <Col span={24} className="right">
                        <Button
                            disabled={loginRequest}
                            shape="round"
                            type="primary"
                            htmlType="submit"
                            onClick={submit}
                            block
                        >
                            {loginRequest ? (
                                <SyncOutlined
                                    rotate={180}
                                    className="grey-main"
                                />
                            ) : (
                                'Войти'
                            )}
                        </Button>
                    </Col>

                    <Col span={24} className="padding-small right">
                        <Button
                            type="link"
                            onClick={() =>
                                dispatch({
                                    type: 'SET_AUTH_FORM_TYPE',
                                    payload: 'forgot'
                                })
                            }
                        >
                            Забыли пароль?
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Login;
