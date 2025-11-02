import React, { useState } from 'react';
import imgLogon from '../../assets/images/imgLogin.jpg';
import './LogInUser.scss';
import user from '../../assets/person-circle.svg';
import lock from '../../assets/unlock-fill.svg';
import Logo from '../Logo/Logo';

import { useNavigate } from 'react-router';

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
        <div className="content-page">
            <div className="login-container">
                <div className="login-image">
                    <img src={imgLogon} alt="imgLogo" />
                </div>
                <div className="login-form">
                    <div className="title">
                        <Logo />
                        <h1>Welcome back!</h1>

                        <form action="" onSubmit={handelLogin}>
                            <div>
                                <img src={user} alt="" />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    name="username"
                                    required
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>

                            <br />
                            <div>
                                <img src={lock} alt="" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <br />

                            <button type="submit">Log In</button>

                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LogINSignUb;
