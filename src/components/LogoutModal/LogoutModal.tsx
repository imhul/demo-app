import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// components
import { Space, Button } from 'antd';

// utils
import { delay } from 'utils/delay';
// assets
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import { ReactComponent as ErrorIcon } from 'assets/error-icon.svg';

interface ModalProps {
    onClose: () => void;
    token: string;
}

const Modal = ({ onClose, token }: ModalProps) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);

    const onClick = () => {
        setIsOpen(false);
        async function timer() {
            await delay(500);
            onClose();
        }
        timer();
    };

    const logout = () => {
        dispatch({
            type: 'USER_LOGOUT_REQUEST',
            payload: token
        });
    };

    return (
        <div className="modal">
            <div
                className={`modal-content ${
                    isOpen ? 'open' : 'closed'
                }`}
            >
                <Space direction="vertical">
                    <div className="close" onClick={onClick}>
                        <CloseIcon />
                    </div>
                    <ErrorIcon />
                    <h2>Подтверждение выхода из аккаунта</h2>
                    <p>
                        Вы действительно хотите выйти из своей учетной
                        записи?
                    </p>
                    <Space
                        direction="vertical"
                        style={{ width: '13.5rem', rowGap: 12 }}
                    >
                        <Button
                            size="large"
                            block
                            shape="round"
                            type="primary"
                            onClick={onClick}
                        >
                            Продолжить
                        </Button>
                        <Button
                            size="large"
                            block
                            shape="round"
                            type="default"
                            onClick={logout}
                        >
                            Выйти
                        </Button>
                    </Space>
                </Space>
            </div>
        </div>
    );
};

export default Modal;
