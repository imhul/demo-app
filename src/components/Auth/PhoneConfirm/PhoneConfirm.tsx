import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Input } from 'antd';
// assets
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';

const FormItem = Form.Item;

const PhoneConfirm = () => {
    const {
        user,
        token,
        isSmsSended,
        isPhoneConfirmed,
        confirmPhoneRequest,
        confirmSendSmsRequest
    } = useSelector((s: any) => s.auth);
    const [resendEnabled, setResendEnabled] = useState(true);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const secondsToNextTry = 30;

    const awaiting = () => {
        const timer = setTimeout(() => {
            dispatch({ type: 'PREPARE_TO_RESEND_SMS' });
            setResendEnabled(true);
            clearTimeout(timer);
        }, secondsToNextTry * 1000);
    };

    function getSMSCode() {
        dispatch({
            type: 'USER_CONFIRM_SEND_SMS_REQUEST',
            payload: {
                phone: user.phone
            }
        });
        setResendEnabled(false);
        awaiting();
    }

    useEffect(() => {
        if (
            !confirmSendSmsRequest &&
            !confirmPhoneRequest &&
            !isPhoneConfirmed &&
            !isSmsSended &&
            resendEnabled
        )
            getSMSCode();
    }, []);

    const submit = useCallback(() => {
        const code = form.getFieldValue('code');
        if (
            !confirmSendSmsRequest &&
            !confirmPhoneRequest &&
            !isPhoneConfirmed &&
            token &&
            code
        ) {
            dispatch({
                type: 'USER_CONFIRM_PHONE_REQUEST',
                payload: { token, code }
            });
        }
    }, [
        token,
        form,
        isPhoneConfirmed,
        confirmPhoneRequest,
        confirmSendSmsRequest
    ]);

    return (
        <>
            <div className="auth">
                <Form
                    form={form}
                    className="auth-form"
                    name="phone-confirm-form"
                    layout="vertical"
                    requiredMark={false}
                    size="large"
                >
                    <Row gutter={24} className="phone-confirm">
                        <Col span={24} className="center">
                            <h2>Подтверждение телефона</h2>
                            <p>
                                Мы отправили SMS с 6-значным кодом
                                подтверждения на номер {user.phone}
                            </p>
                        </Col>
                        <Col span={24}>
                            <FormItem
                                name="code"
                                label="SMS-код"
                                rules={[
                                    {
                                        len: 6,
                                        type: 'string',
                                        whitespace: true,
                                        message:
                                            'Код должен состоять из 6 цифр'
                                    },
                                    {
                                        required: true,
                                        message: 'Обязательное поле'
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Укажите код"
                                    autoComplete="off"
                                    style={{ width: '100%' }}
                                />
                            </FormItem>
                            <div className="link-wrapper">
                                <Button
                                    htmlType="button"
                                    type="link"
                                    size="small"
                                    onClick={getSMSCode}
                                    disabled={!resendEnabled}
                                >
                                    Оправить код повторно
                                </Button>
                            </div>
                        </Col>
                        <Col span={24}>
                            <Button
                                type="primary"
                                onClick={submit}
                                htmlType="submit"
                                shape="round"
                                size="large"
                                block
                            >
                                Подтвердить
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div className="btn-wrapper">
                <Button type="link" href="/profile">
                    <BackIcon /> <span>Назад</span>
                </Button>
                <div className="right-helper" />
            </div>
        </>
    );
};

export default PhoneConfirm;
