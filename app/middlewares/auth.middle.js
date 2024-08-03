import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthMiddleware = ({ component: Component, isAuthenticated, ...rest }) => {
    if (isAuthenticated) {
        return <Component {...rest} />;
    } else {
        return <Redirect to="/login" />;
    }
};

export default AuthMiddleware;