// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';

const ProtectedRoute: React.FC = () => {
    const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);

    // If logged in, render nested routes via <Outlet />
    // Otherwise redirect to login
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
