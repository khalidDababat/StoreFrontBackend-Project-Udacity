import React, { Fragment } from 'react';
import './Dashboard.scss';

import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <Fragment>
            <div className="container-Dashboard">
                <Sidebar />
                <div className="Dashboard">
                    <h1>Dashboard</h1>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
