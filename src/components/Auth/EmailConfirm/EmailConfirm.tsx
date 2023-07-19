import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

const EmailConfirm = () => {
    const dispatch = useDispatch();

    return <Button type="primary">Welcome</Button>;
};

export default EmailConfirm;
