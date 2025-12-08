import React from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';

import logoImage from '../../assets/images/Logo.png';

import './Header.scss';
const MainHeader = () => {
    return (
        <header>
            <div>
                <span className="icon-cart">
                    <ProductionQuantityLimitsIcon />
                </span>
                <span className="icon-login">
                    <PermIdentityIcon />
                </span>
            </div>

            <div className="logo">
                <img src={logoImage} alt="logoImage" />
            </div>

            <div>
                <span className="menu-icon">
                    <MenuIcon />
                </span>
            </div>
        </header>
    );
};

export default MainHeader;
