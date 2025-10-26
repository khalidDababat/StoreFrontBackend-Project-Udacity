import React from 'react';
import logo from '../../assets/images/Logo.jpg';
import './Logo.scss';

const Logo = () => {
    return (
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
    );
};
export default Logo;
