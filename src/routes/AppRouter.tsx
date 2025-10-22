// src/routes/AppRouter.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WithAuthLayout from '@layouts/WithAuthLayout';
import WithoutAuthLayout from '@layouts/WithoutAuthLayout';
import LoginPage from '@features/auth/LoginPage';
import DashboardPage from '@features/dashboard/pages/Overview';
import NotFoundPage from '@pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* Auth routes */}
            <Route element={<WithoutAuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<WithAuthLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
            </Route>

            {/* Redirect root */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
