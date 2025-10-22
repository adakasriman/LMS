import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';
import { useLoginMutation } from '@api/endpoints/userApi';
import { useAppDispatch } from '@app/hooks';
import { setCredentials } from '@features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // try {
        //     const result = await login({ email, password }).unwrap();
        //     dispatch(setCredentials({ token: result.token, user: null })); // user can be fetched after login
        // } catch (err) {
        //     console.error('Login failed', err);
        // }
        // set dummy token
        dispatch(setCredentials({ token: 'dummy-token', user: { id: '1', name: 'John Doe', email: 'john.doe@example.com' } }));
        navigate('/dashboard');
    };

    return (
        <Card className="p-8 w-full max-w-md">
            <Typography variant="h5" className="mb-6">Login</Typography>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </Card>
    );
};

export default LoginPage;
