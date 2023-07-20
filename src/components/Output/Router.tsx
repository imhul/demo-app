import React from 'react';
import { useSelector } from 'react-redux';
import {
    Route,
    BrowserRouter,
    Routes,
    Navigate
} from 'react-router-dom';
// components
import Auth from 'components/Auth';
import Profile from 'components/Profile';
import EmailConfirm from 'components/Auth/EmailConfirm';
import PhoneConfirm from 'components/Auth/PhoneConfirm';

const Router = () => {
    const { isLoggedIn, registerStep, isRegistered } = useSelector(
        (s: any) => s.auth
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/profile" replace />
                        ) : (
                            <Auth />
                        )
                    }
                />

                <Route
                    path="/email-confirm"
                    element={
                        isRegistered &&
                        (registerStep === 1 || registerStep === 2) ? (
                            <EmailConfirm />
                        ) : (
                            <Navigate
                                to={isLoggedIn ? '/profile' : '/'}
                                replace
                            />
                        )
                    }
                />

                <Route
                    path="/phone-confirm"
                    element={
                        registerStep === 3 || registerStep === 4 ? (
                            <PhoneConfirm />
                        ) : (
                            <Navigate
                                to={isLoggedIn ? '/profile' : '/'}
                                replace
                            />
                        )
                    }
                />

                <Route
                    path="/profile"
                    element={
                        isLoggedIn ? (
                            <Profile />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
