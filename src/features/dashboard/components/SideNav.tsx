import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { Dashboard, TableChart, BarChart, Settings } from '@mui/icons-material';

const links = [
    { name: 'Overview', path: '/', icon: ''},
    { name: 'Transactions', path: '/transactions', icon: '' },
    { name: 'Reports', path: '/reports', icon: '' },
    { name: 'Settings', path: '/settings', icon: '' },
];

const SideNav: React.FC = () => {
    const location = useLocation();
    return (
        <nav className="w-64 bg-white border-r h-full flex flex-col p-4">
            <h1 className="text-xl font-bold mb-6">FinanceApp</h1>
            <ul className="flex flex-col gap-2">
                {links.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${location.pathname === link.path ? 'bg-gray-200 font-bold' : ''
                                }`}
                        >
                            {/* {link.icon} */}
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SideNav;
