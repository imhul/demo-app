import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// components
import Auth from 'components/Auth';
import Profile from 'components/Profile';
import PrivateRoute from 'hoc/privateRoute';
import EmailConfirm from 'components/Auth/EmailConfirm';

const Router = () => {
    const { isLoggedIn } = useSelector((s: any) => s.auth);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/email-confirm"
                    element={<EmailConfirm />}
                />
                {isLoggedIn ? (
                    <PrivateRoute
                        path="/profile"
                        element={<Profile />}
                    />
                ) : (
                    <Route
                        path="/"
                        element={<Auth />}
                    />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;