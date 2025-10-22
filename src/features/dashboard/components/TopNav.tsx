import React from 'react';
import {
    Box,
    IconButton,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    Divider,
    Tooltip,
    alpha,
} from '@mui/material';
import {
    Brightness4,
    Brightness7,
    Notifications,
    Search,
    Settings,
    AccountCircle,
    Logout,
    Menu as MenuIcon,
    KeyboardArrowDown,
} from '@mui/icons-material';
import { keyframes } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@app/hooks';
import { logout } from '@features/auth/authSlice';
import { useLocation } from 'react-router-dom';

// Animation keyframes
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const TopNav: React.FC = () => {
    const [dark, setDark] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notifAnchorEl, setNotifAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const toggleTheme = () => {
        setDark(!dark);
        document.documentElement.classList.toggle('dark');
    };

    const handleLogout = () => {
        Cookies.remove('auth_token');
        dispatch(logout());
        handleMenuClose();
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNotifAnchorEl(event.currentTarget);
    };

    const handleNotifClose = () => {
        setNotifAnchorEl(null);
    };

    // Get page title from route
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/') return 'Dashboard Overview';
        if (path === '/transactions') return 'Transactions';
        if (path === '/reports') return 'Reports';
        if (path === '/settings') return 'Settings';
        return 'Dashboard';
    };

    const notifications = [
        { id: 1, text: 'New transaction recorded', time: '2 min ago', unread: true },
        { id: 2, text: 'Monthly report ready', time: '1 hour ago', unread: true },
        { id: 3, text: 'Budget limit reached', time: '3 hours ago', unread: false },
    ];

    const unreadCount = notifications.filter((n) => n.unread).length;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 4,
                py: 2,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                width: '100%',
                animation: `${slideDown} 0.4s ease-out`,
            }}
        >
            {/* Left Section - Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'rotate(90deg)',
                            background: alpha('#667eea', 0.1),
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: `${slideDown} 0.5s ease-out`,
                        }}
                    >
                        {getPageTitle()}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            display: 'block',
                            mt: -0.5,
                        }}
                    >
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Typography>
                </Box>
            </Box>

            {/* Right Section - Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {/* Search Button */}
                <Tooltip title="Search" arrow>
                    <IconButton
                        sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: alpha('#667eea', 0.1),
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Search />
                    </IconButton>
                </Tooltip>

                {/* Theme Toggle */}
                <Tooltip title={dark ? 'Light Mode' : 'Dark Mode'} arrow>
                    <IconButton
                        onClick={toggleTheme}
                        sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: alpha('#667eea', 0.1),
                                transform: 'rotate(180deg) scale(1.1)',
                            },
                        }}
                    >
                        {dark ? (
                            <Brightness7 sx={{ color: '#FDB813' }} />
                        ) : (
                            <Brightness4 sx={{ color: '#667eea' }} />
                        )}
                    </IconButton>
                </Tooltip>

                {/* Notifications */}
                <Tooltip title="Notifications" arrow>
                    <IconButton
                        onClick={handleNotifOpen}
                        sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: alpha('#667eea', 0.1),
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Badge
                            badgeContent={unreadCount}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    animation: unreadCount > 0 ? `${pulse} 2s ease-in-out infinite` : 'none',
                                },
                            }}
                        >
                            <Notifications />
                        </Badge>
                    </IconButton>
                </Tooltip>

                {/* Notifications Menu */}
                <Menu
                    anchorEl={notifAnchorEl}
                    open={Boolean(notifAnchorEl)}
                    onClose={handleNotifClose}
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            minWidth: 320,
                            borderRadius: 2,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                            animation: `${slideDown} 0.3s ease-out`,
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Notifications
                        </Typography>
                    </Box>
                    {notifications.map((notif) => (
                        <MenuItem
                            key={notif.id}
                            sx={{
                                py: 1.5,
                                px: 2,
                                borderLeft: notif.unread ? '3px solid #667eea' : '3px solid transparent',
                                background: notif.unread ? alpha('#667eea', 0.05) : 'transparent',
                                '&:hover': {
                                    background: alpha('#667eea', 0.1),
                                },
                            }}
                        >
                            <Box>
                                <Typography variant="body2" fontWeight={notif.unread ? 600 : 400}>
                                    {notif.text}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {notif.time}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                    <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Button
                            fullWidth
                            size="small"
                            sx={{
                                textTransform: 'none',
                                color: '#667eea',
                                fontWeight: 600,
                            }}
                        >
                            View all notifications
                        </Button>
                    </Box>
                </Menu>

                <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'divider' }} />

                {/* User Profile */}
                <Box
                    onClick={handleMenuOpen}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: alpha('#667eea', 0.08),
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                        <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                            John Doe
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Administrator
                        </Typography>
                    </Box>
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        JD
                    </Avatar>
                    <KeyboardArrowDown
                        sx={{
                            fontSize: 20,
                            color: 'text.secondary',
                            transition: 'transform 0.3s ease',
                            transform: anchorEl ? 'rotate(180deg)' : 'rotate(0)',
                        }}
                    />
                </Box>

                {/* User Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            minWidth: 220,
                            borderRadius: 2,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                            animation: `${slideDown} 0.3s ease-out`,
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                            John Doe
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            john.doe@example.com
                        </Typography>
                    </Box>
                    <MenuItem
                        onClick={handleMenuClose}
                        sx={{
                            gap: 1.5,
                            py: 1.5,
                            '&:hover': {
                                background: alpha('#667eea', 0.08),
                            },
                        }}
                    >
                        <AccountCircle fontSize="small" />
                        <Typography variant="body2">My Profile</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={handleMenuClose}
                        sx={{
                            gap: 1.5,
                            py: 1.5,
                            '&:hover': {
                                background: alpha('#667eea', 0.08),
                            },
                        }}
                    >
                        <Settings fontSize="small" />
                        <Typography variant="body2">Settings</Typography>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                        onClick={handleLogout}
                        sx={{
                            gap: 1.5,
                            py: 1.5,
                            color: 'error.main',
                            '&:hover': {
                                background: alpha('#f44336', 0.08),
                            },
                        }}
                    >
                        <Logout fontSize="small" />
                        <Typography variant="body2">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default TopNav;