import React from 'react';
import SideNav from '../features/dashboard/components/SideNav';
import TopNav from '../features/dashboard/components/TopNav';

const WithAuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex h-screen">
        <SideNav />
        <div className="flex flex-col flex-1">
            <TopNav />
            <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
        </div>
    </div>
);

export default WithAuthLayout;
