// src/layouts/WithAuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '@features/dashboard/components/DashboardLayout';

const WithAuthLayout: React.FC = () => {
    return (
        <DashboardLayout>
            {/* Render nested routes */}
            <Outlet />
        </DashboardLayout>
    );
};

export default WithAuthLayout;
