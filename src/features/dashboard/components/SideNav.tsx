import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Dashboard,
    TableChart,
    BarChart,
    Settings,
    ChevronLeft,
    ChevronRight,
    Logout,
    AccountCircle,
} from '@mui/icons-material';
import { Box, IconButton, Tooltip, alpha } from '@mui/material';
import { keyframes } from '@mui/material/styles';

const links = [
    { name: 'Overview', path: '/', icon: <Dashboard /> },
    { name: 'Transactions', path: '/transactions', icon: <TableChart /> },
    { name: 'Reports', path: '/reports', icon: <BarChart /> },
    { name: 'Settings', path: '/settings', icon: <Settings /> },
];

// Animation keyframes
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const SideNav: React.FC = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <Box
            sx={{
                width: isCollapsed ? '80px' : '260px',
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    mb: 2,
                }}
            >
                {!isCollapsed && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            animation: `${slideIn} 0.3s ease-out`,
                        }}
                    >
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            <Dashboard sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
                            FinanceApp
                        </Box>
                    </Box>
                )}
                {isCollapsed && (
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <Dashboard sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                )}
            </Box>

            {/* Toggle Button */}
            <IconButton
                onClick={() => setIsCollapsed(!isCollapsed)}
                sx={{
                    position: 'absolute',
                    top: 24,
                    right: -16,
                    width: 32,
                    height: 32,
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: 'white',
                        transform: 'scale(1.1)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                {isCollapsed ? (
                    <ChevronRight sx={{ fontSize: 20 }} />
                ) : (
                    <ChevronLeft sx={{ fontSize: 20 }} />
                )}
            </IconButton>

            {/* Navigation Links */}
            <Box
                component="nav"
                sx={{
                    flex: 1,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {links.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    const isHovered = hoveredItem === link.name;

                    return (
                        <Tooltip
                            key={link.name}
                            title={isCollapsed ? link.name : ''}
                            placement="right"
                            arrow
                        >
                            <Link
                                to={link.path}
                                style={{ textDecoration: 'none' }}
                                onMouseEnter={() => setHoveredItem(link.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: isCollapsed ? 1.5 : 1.5,
                                        borderRadius: 2,
                                        color: 'white',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        animation: `${slideIn} ${0.3 + index * 0.1}s ease-out`,
                                        background: isActive
                                            ? 'rgba(255, 255, 255, 0.2)'
                                            : 'transparent',
                                        backdropFilter: isActive ? 'blur(10px)' : 'none',
                                        border: isActive
                                            ? '1px solid rgba(255, 255, 255, 0.3)'
                                            : '1px solid transparent',
                                        boxShadow: isActive
                                            ? '0 4px 15px rgba(0, 0, 0, 0.1)'
                                            : 'none',
                                        transform:
                                            isHovered || isActive ? 'translateX(5px)' : 'translateX(0)',
                                        '&:hover': {
                                            background: 'rgba(255, 255, 255, 0.15)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: '4px',
                                            background: 'white',
                                            borderRadius: '0 4px 4px 0',
                                            transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                                            transition: 'transform 0.3s ease',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 24,
                                            transition: 'transform 0.3s ease',
                                            transform: isHovered ? 'rotate(10deg) scale(1.1)' : 'none',
                                            animation: isActive ? `${pulse} 2s ease-in-out infinite` : 'none',
                                        }}
                                    >
                                        {link.icon}
                                    </Box>
                                    {!isCollapsed && (
                                        <Box
                                            sx={{
                                                fontSize: '0.95rem',
                                                fontWeight: isActive ? 600 : 500,
                                                whiteSpace: 'nowrap',
                                                animation: `${slideIn} 0.3s ease-out`,
                                            }}
                                        >
                                            {link.name}
                                        </Box>
                                    )}
                                    {isActive && !isCollapsed && (
                                        <Box
                                            sx={{
                                                ml: 'auto',
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: 'white',
                                                animation: `${pulse} 1.5s ease-in-out infinite`,
                                            }}
                                        />
                                    )}
                                </Box>
                            </Link>
                        </Tooltip>
                    );
                })}
            </Box>

            {/* User Profile Section */}
            <Box
                sx={{
                    p: 2,
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    mt: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1.5,
                        borderRadius: 2,
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.15)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        },
                    }}
                >
                    <AccountCircle sx={{ fontSize: 32, color: 'white' }} />
                    {!isCollapsed && (
                        <Box sx={{ flex: 1, animation: `${slideIn} 0.3s ease-out` }}>
                            <Box sx={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>
                                John Doe
                            </Box>
                            <Box sx={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                                john.doe@example.com
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Logout Button */}
                <Tooltip title={isCollapsed ? 'Logout' : ''} placement="right" arrow>
                    <IconButton
                        sx={{
                            mt: 1,
                            width: '100%',
                            color: 'white',
                            py: 1.5,
                            borderRadius: 2,
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                            gap: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'rgba(244, 67, 54, 0.3)',
                                border: '1px solid rgba(244, 67, 54, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <Logout sx={{ fontSize: 20 }} />
                        {!isCollapsed && (
                            <Box
                                sx={{
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    animation: `${slideIn} 0.3s ease-out`,
                                }}
                            >
                                Logout
                            </Box>
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default SideNav;