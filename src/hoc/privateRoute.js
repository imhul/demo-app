import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isLoggedIn } = useSelector(s => s.auth);
    return (
        <Route
            {...rest}
            element={
                isLoggedIn ? (
                    <Element />
                ) : (
                    <Navigate to="/login" replace />
                )
            }
        />
    );
};

export default PrivateRoute;
