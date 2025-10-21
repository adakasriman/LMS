import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WithAuthLayout from '../layouts/WithAuthLayout';
import WithoutAuthLayout from '../layouts/WithoutAuthLayout';
import Overview from '../features/dashboard/pages/Overview';
import LoginPage from '../features/auth/LoginPage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => (
    <Router>
        <Routes>
            <Route element={<WithoutAuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route
                element={
                    <ProtectedRoute>
                        <WithAuthLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<Overview />} />
            </Route>
        </Routes>
    </Router>
);

export default AppRouter;
