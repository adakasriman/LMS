import React from 'react';
import SideNav from '@components/SideNav';
import TopNav from '@components/TopNav';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ flexShrink: 0 }}>
        <SideNav />
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <TopNav />
        <main
          style={{
            flex: 1,
            padding: '24px',
            backgroundColor: '#f9fafb', // Tailwind bg-gray-50 equivalent
            overflow: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
