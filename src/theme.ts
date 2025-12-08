import { createTheme } from '@mui/material/styles';

/**
 * Custom Material UI Theme
 * Designed for a premium, modern restaurant ordering experience.
 */
const theme = createTheme({
    palette: {
        primary: {
            main: '#1A237E', // Deep Indigo for a trustworthy, premium feel
            light: '#534BAE',
            dark: '#000051',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FF6F00',
            light: '#FFA040',
            dark: '#C43E00',
            contrastText: '#000000',
        },
        background: {
            default: '#F5F5F5', 
            paper: '#FFFFFF', 
        },
        text: {
            primary: '#212121', // Dark Grey for primary text
            secondary: '#757575', // Medium Grey for secondary text
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.3,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.4,
        },
        h6: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.4,
        },
        button: {
            textTransform: 'none', // Remove uppercase transformation for a more modern look
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12, // Softer, more modern rounded corners
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '8px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow:
                            '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#151b60',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Soft, diffused shadow
                    transition:
                        'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.05)',
                    backgroundColor: '#FFFFFF',
                    color: '#212121',
                },
            },
        },
    },
});

export default theme;
