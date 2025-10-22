// src/layouts/WithoutAuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const WithoutAuthLayout: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <Outlet />
        </div>
    );
};

export default WithoutAuthLayout;
