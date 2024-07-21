import React from 'react';
import { Redirect } from 'react-router-dom';

// auth.middleware.js

// Import the necessary dependencies



const AuthMiddleware = ({ component: Component, isAuthenticated, ...rest }) => {
    if (isAuthenticated) {
        return <Component {...rest} />;
    } else {
        return <Redirect to="/login" />;
    }
};

export default AuthMiddleware;