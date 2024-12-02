import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfLoggedIn = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default RedirectIfLoggedIn;
