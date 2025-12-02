import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Button,
    Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../Logo/Logo';

const drawerWidth = 240;

const Sidebar = () => {
    const location = useLocation();
    //const navigate = useNavigate();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Products', icon: <ShoppingBasketIcon />, path: '/products' },
        { text: 'Orders', icon: <BookmarkIcon />, path: '#' },
        { text: 'Reports', icon: <NotificationsIcon />, path: '#' },
        { text: 'Manage Staff', icon: <PersonAddIcon />, path: '#' },
    ];

    const handelLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: 'none',
                    boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
                },
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 64,
                }}
            >
                <Logo />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{
                                borderRadius: '0 24px 24px 0',
                                mr: 2,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.light',
                                    color: 'primary.contrastText',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.contrastText',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'text.secondary' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ mt: 'auto', p: 2 }}>
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    startIcon={<ExitToAppIcon />}
                    onClick={handelLogout}
                    sx={{ borderRadius: 2 }}
                >
                    Logout
                </Button>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
