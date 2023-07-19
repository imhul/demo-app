import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// types
import type { TabsProps, MenuProps } from 'antd';
// components
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import { Tabs, Dropdown, Divider, Row, Col, Button } from 'antd';
// assets
import { ReactComponent as GoogleIcon } from 'assets/google-icon.svg';
import { ReactComponent as FacebookIcon } from 'assets/facebook-icon.svg';
import { ReactComponent as LinkedinIcon } from 'assets/linkedin-icon.svg';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Вход`,
        children: <Login />
    },
    {
        key: '2',
        label: `Регистрация`,
        children: <Register />
    }
];

const langueges = [
    {
        key: '1',
        label: 'En'
    },
    {
        key: '2',
        label: 'Ru'
    }
];

const Auth: React.FC = () => {
    const dispatch = useDispatch();
    const [lang, setLang] = useState('1');

    const onMenuClick: MenuProps['onClick'] = e => setLang(e.key);

    return (
        <>
            <div className="switch">
                <Dropdown
                    placement="bottom"
                    menu={{
                        items: langueges,
                        selectable: true,
                        onClick: onMenuClick,
                        selectedKeys: [lang]
                    }}
                >
                    <span>{langueges[Number(lang) - 1].label}</span>
                </Dropdown>
            </div>
            <div className="auth">
                <Tabs
                    centered
                    defaultActiveKey="1"
                    items={items}
                    animated={{
                        inkBar: true,
                        tabPane: true
                    }}
                    onChange={() =>
                        dispatch({ type: 'SET_AUTH_TAB' })
                    }
                />
                <div>
                    <Divider>
                        <span>Или войдите с помощью</span>
                    </Divider>
                    <Row gutter={12} justify="center" align="middle">
                        <Col span={8}>
                            <Button block size="large">
                                <GoogleIcon />
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button block size="large">
                                <FacebookIcon />
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button block size="large">
                                <LinkedinIcon />
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default Auth;
