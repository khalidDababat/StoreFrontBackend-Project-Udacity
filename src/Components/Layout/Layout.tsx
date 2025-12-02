import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import HeaderUser from '../Headers/HeaderUser';

const Layout = () => {
    const location = useLocation();

    const title = useMemo(() => {
        switch (location.pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/products':
                return 'Products';
            case '/createProduct':
                return 'Create Product';
            default:
                return 'Restaurant App';
        }
    }, [location.pathname]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    backgroundColor: 'background.default',
                }}
            >
                <HeaderUser title={title} />
                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
