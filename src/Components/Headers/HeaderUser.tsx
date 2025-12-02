import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

interface HeaderUserProps {
    title: string;
}

const HeaderUser: React.FC<HeaderUserProps> = ({ title }) => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Toolbar>
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{ flexGrow: 1, fontWeight: 600 }}
                >
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small">
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <PersonIcon />
                        </Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderUser;
