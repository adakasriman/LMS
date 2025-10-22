import React, { useState } from 'react';
import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
    alpha,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
} from '@mui/icons-material';
import { keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks';
import { setCredentials } from '@features/auth/authSlice';
import Cookies from 'js-cookie';
// import { useLoginMutation } from '@api/endpoints/userApi';

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.15; }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            dispatch(
                setCredentials({
                    token: 'dummy-token',
                    user: { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
                })
            );
            Cookies.set('auth_token', 'dummy-token');
            navigate('/dashboard');
        }, 1500);

        // Uncomment for real API call:
        // try {
        //     const result = await login({ email, password }).unwrap();
        //     dispatch(setCredentials({ token: result.token, user: null }));
        //     Cookies.set('auth_token', result.token);
        //     navigate('/dashboard');
        // } catch (err) {
        //     console.error('Login failed', err);
        // }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                overflow: 'hidden',
                p: 2,
            }}
        >
            {/* Animated background circles */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    top: '-200px',
                    left: '-200px',
                    animation: `${pulse} 4s ease-in-out infinite`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    bottom: '-200px',
                    right: '-200px',
                    animation: `${pulse} 4s ease-in-out infinite 2s`,
                }}
            />

            {/* Login Card */}
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    animation: `${slideIn} 0.6s ease-out`,
                    position: 'relative',
                    zIndex: 1,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                    },
                }}
            >
                {/* Header with animated icon */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            height: 70,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                            mb: 2,
                            animation: `${float} 3s ease-in-out infinite`,
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'rotate(180deg)',
                            },
                        }}
                    >
                        <Lock sx={{ fontSize: 35, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sign in to continue to your account
                    </Typography>
                </Box>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {/* Email Field */}
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: 'action.active' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                                    },
                                    '&.Mui-focused': {
                                        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                                    },
                                },
                            }}
                        />

                        {/* Password Field */}
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: 'action.active' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{
                                                transition: 'transform 0.2s ease',
                                                '&:hover': { transform: 'scale(1.1)' },
                                            }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                                    },
                                    '&.Mui-focused': {
                                        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                                    },
                                },
                            }}
                        />

                        {/* Remember Me & Forgot Password */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <FormControlLabel
                                control={<Checkbox size="small" />}
                                label={<Typography variant="body2">Remember me</Typography>}
                            />
                            <Button
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    color: '#667eea',
                                    fontWeight: 600,
                                    '&:hover': { color: '#764ba2' },
                                }}
                            >
                                Forgot password?
                            </Button>
                        </Box>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            sx={{
                                py: 1.5,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                                    transform: 'translateY(-2px)',
                                },
                                '&:active': {
                                    transform: 'translateY(0)',
                                },
                                '&.Mui-disabled': {
                                    background: alpha('#667eea', 0.6),
                                },
                            }}
                        >
                            {isLoading ? 'Logging in...' : 'Sign In'}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default LoginPage;