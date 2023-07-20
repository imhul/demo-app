import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// components
import Aside from 'components/Output/Aside';
import Router from 'components/Output/Router';
import { Layout } from 'antd';

const { Content } = Layout;

const Output: React.FC = () => {
    const { registerStep } = useSelector((s: any) => s.auth);
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();

    const contentStyle: React.CSSProperties = {
        minHeight: '100vh'
    };

    useEffect(() => {
        dispatch({ type: 'INITIALIZE' });
    }, []);

    useEffect(() => {
        if (!collapsed) {
            setCollapsed(registerStep > 1);
        }
    }, [collapsed, registerStep]);

    return (
        <Layout>
            <Aside collapsed={collapsed} />
            <main className={collapsed ? 'extended' : ''}>
                <Content style={contentStyle}>
                    <Router />
                </Content>
            </main>
        </Layout>
    );
};

export default Output;
