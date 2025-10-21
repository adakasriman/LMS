import React from 'react';

const WithoutAuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        {children}
    </div>
);

export default WithoutAuthLayout;
