import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Dashboard = () => {
    const stats = [
        {
            title: 'Total Revenue',
            value: '$12,340',
            icon: <AttachMoneyIcon fontSize="large" />,
            color: '#4caf50',
        },
        {
            title: 'Total Orders',
            value: '1,250',
            icon: <ShoppingCartIcon fontSize="large" />,
            color: '#2196f3',
        },
        {
            title: 'New Customers',
            value: '320',
            icon: <PeopleIcon fontSize="large" />,
            color: '#ff9800',
        },
        {
            title: 'Growth',
            value: '+15%',
            icon: <TrendingUpIcon fontSize="large" />,
            color: '#f44336',
        },
    ];

    return (
        <Box>
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 4 }}
            >
                Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100%',
                                borderRadius: 2,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {stat.title}
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {stat.value}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: `${stat.color}20`,
                                    color: stat.color,
                                    p: 1.5,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {stat.icon}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
                <Paper
                    elevation={2}
                    sx={{ p: 3, borderRadius: 2, minHeight: 400 }}
                >
                    <Typography variant="h6" gutterBottom>
                        Recent Activity
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        No recent activity to display.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default Dashboard;
