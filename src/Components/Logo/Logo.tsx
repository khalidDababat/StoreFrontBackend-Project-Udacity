import React from 'react';
import { Box } from '@mui/material';
import logo from '../../assets/images/Logo.png';
import './Logo.scss';

const Logo = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 1,
            }}
        >
            <img className="logo" src={logo} alt="logo" />
        </Box>
    );
};
export default Logo;
