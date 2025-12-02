import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    Alert,
    InputAdornment,
    Container,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Logo from '../Logo/Logo';
import imgLogon from '../../assets/images/imgLogin.jpg';

const LogINSignUb = () => {
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    interface LoginPayload {
        firstName: string;
        password: string;
    }

    const handelLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setError('');

        try {
            const payload: LoginPayload = { firstName, password };

            const res: Response = await fetch(
                `${process.env.REACT_APP_BACKEND_UR}/users/authenticate`,
                {
                    method: 'POST',
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                setError('Invalid first name or password');
                return;
            }
            const data = await res.json();

            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Server connection error');
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                p: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    maxWidth: 1000,
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    display: 'flex',
                }}
            >
                <Grid container>
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            backgroundImage: `url(${imgLogon})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                p: { xs: 4, md: 8 },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '100%',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ mb: 4 }}>
                                <Logo />
                            </Box>
                            <Typography
                                component="h1"
                                variant="h4"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Welcome back!
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 4 }}
                            >
                                Please enter your details to sign in.
                            </Typography>

                            <Box
                                component="form"
                                onSubmit={handelLogin}
                                sx={{ width: '100%' }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {error && (
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        mt: 4,
                                        mb: 2,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    Log In
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default LogINSignUb;
