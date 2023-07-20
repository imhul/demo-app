import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    message
} from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/ru_RU';

const FormItem = Form.Item;
const genders = [
    {
        value: 0,
        label: 'Мужской'
    },
    {
        value: 1,
        label: 'Женский'
    },
    {
        value: 2,
        label: 'Другой'
    }
];

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const {
        user,
        token,
        registerStep,
        isRegistered,
        profileCreateRequest,
        isProfileCreated
    } = useSelector((s: any) => s.auth);

    const submit = useCallback(() => {
        const values = form.getFieldsValue();
        const { email, birth_date, ...rest } = values;

        if (isRegistered && values && token?.length) {
            dispatch({
                type: 'USER_CREATE_PROFILE_REQUEST',
                payload: {
                    token,
                    data: {
                        ...rest,
                        birth_date: birth_date.format('YYYY-MM-DD')
                    }
                }
            });
        }
    }, [isRegistered, token]);

    return (
        <>
            <div className="auth extended">
                <Form
                    form={form}
                    className="auth-form"
                    name="register-form"
                    layout="vertical"
                    size="large"
                    onFinish={submit}
                >
                    <Row gutter={24} className="profile">
                        <Col span={24}>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem
                                        name="sname"
                                        label="Фамилия"
                                        rules={[
                                            {
                                                min: 3,
                                                type: 'string',
                                                whitespace: true,
                                                message:
                                                    'Длина пароля должна быть не менее 3 символов'
                                            },
                                            {
                                                required: true,
                                                message:
                                                    'Обязательное поле'
                                            }
                                        ]}
                                    >
                                        <Input autoComplete="off" />
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        name="name"
                                        label="Имя"
                                        rules={[
                                            {
                                                min: 3,
                                                type: 'string',
                                                whitespace: true,
                                                message:
                                                    'Длина пароля должна быть не менее 3 символов'
                                            },
                                            {
                                                required: true,
                                                message:
                                                    'Обязательное поле'
                                            }
                                        ]}
                                    >
                                        <Input autoComplete="off" />
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        name="lname"
                                        label="Отчество"
                                        rules={[
                                            {
                                                min: 3,
                                                type: 'string',
                                                whitespace: true,
                                                message:
                                                    'Длина пароля должна быть не менее 3 символов'
                                            },
                                            {
                                                required: true,
                                                message:
                                                    'Обязательное поле'
                                            }
                                        ]}
                                    >
                                        <Input autoComplete="off" />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <FormItem
                                name="birth_date"
                                label="Дата рождения"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Обязательное поле'
                                    }
                                ]}
                            >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    locale={locale}
                                    style={{ width: '100%' }}
                                    placeholder="10/08/1983"
                                />
                            </FormItem>
                        </Col>

                        <Col span={24}>
                            <FormItem
                                name="gender_id"
                                label="Пол"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Обязательное поле'
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="Выберите пол"
                                    options={genders}
                                />
                            </FormItem>
                        </Col>

                        <Col span={24}>
                            <FormItem
                                name="phone"
                                label="Телефон"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Обязательное поле'
                                    }
                                ]}
                            >
                                <Input
                                    type="tel"
                                    placeholder="+38 (050) 725 60 09"
                                    autoComplete="tel"
                                />
                            </FormItem>
                        </Col>
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
                                {!user.email?.length ? (
                                    <Input
                                        type="email"
                                        placeholder="Адрес эл. почты"
                                        autoComplete="email"
                                    />
                                ) : (
                                    <Input
                                        disabled
                                        defaultValue={user.email}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            {registerStep === 3 && (
                <div className="btn-wrapper">
                    <Button
                        disabled={profileCreateRequest}
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        size="large"
                        onClick={() => form.submit()}
                    >
                        {!isProfileCreated && profileCreateRequest ? (
                            <SyncOutlined
                                rotate={180}
                                className="grey-main"
                            />
                        ) : (
                            'Далее'
                        )}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Profile;
