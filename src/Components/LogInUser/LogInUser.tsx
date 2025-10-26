import React from 'react';
import imgLogon from '../../assets/images/imgLogin.jpg';
import './LogInUser.scss';
import user from '../../assets/person-circle.svg';
import lock from '../../assets/unlock-fill.svg';
import Logo from '../Logo/Logo';

const LogINSignUb = () => {
    return (
        <div className="login-container">
            <div className="login-image">
                <img src={imgLogon} alt="imgLogo" />
            </div>
            <div className="login-form">
                <div className="title">
                    <Logo />
                    <h1>Welcome back!</h1>

                    <form action="">
                        <div>
                            <img src={user} alt="" />
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                name="username"
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
                            />
                        </div>

                        <br />

                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LogINSignUb;
