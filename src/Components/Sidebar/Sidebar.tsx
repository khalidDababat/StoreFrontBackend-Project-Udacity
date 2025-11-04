import React from 'react';
import './Sidebar.scss';
import Logo from '../Logo/Logo';

import dashboardLogo from '../../assets/bar-chart-fill.svg';
import productsLogo from '../../assets/basket2.svg';
import ordersLogo from '../../assets/bookmark-fill.svg';
import reportsLogo from '../../assets/bell-fill.svg';
import manageLogo from '../../assets/person-add.svg';
import { Link } from 'react-router-dom';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <Logo />
            </div>

            <div className="container">
                <div className="item" id="active">
                    <img src={dashboardLogo} alt="Dashboard" />
                    <Link to="/dashboard">Dashboard</Link>
                </div>

                <div className="item">
                    <img src={productsLogo} alt="Products" />
                    <Link to="/products">Products</Link>
                </div>
                <div className="item">
                    <img src={ordersLogo} alt="Orders" />
                    <a href="#">Orders</a>
                </div>
                <div className="item">
                    <img src={reportsLogo} alt="reports" />
                    <a href="#">Reports</a>
                </div>
                <div className="item">
                    <img src={manageLogo} alt="manage" />
                    <a href="#">Manage Staff</a>
                </div>
            </div>

            <button>
                Logout <ExitToAppIcon />
            </button>
        </div>
    );
};
export default Sidebar;
