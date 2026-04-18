import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#7c3aed', // A modern, sleek purple
            light: '#a78bfa',
            dark: '#5b21b6',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#0ea5e9', // Sky blue accent
            light: '#38bdf8',
            dark: '#0284c7',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc', // Very subtle cool gray
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a', // Slate 900
            secondary: '#64748b', // Slate 500
        },
        error: {
            main: '#ef4444',
        },
        divider: 'rgba(15, 23, 42, 0.08)',
    },
    typography: {
        fontFamily: '"Poppins", "Inter", "Roboto", sans-serif',
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none', // Modern apps don't usually use ALL CAPS for buttons
        },
    },
    shape: {
        borderRadius: 12, // More rounded corners by default
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                },
                contained: {
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Remove weird overlay on dark modes if toggled
                },
                elevation1: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                },
                elevation0: {
                    boxShadow: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
                    border: '1px solid rgba(15, 23, 42, 0.05)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        backgroundColor: '#ffffff',
                        transition: 'all 0.2s ease-in-out',
                        '& fieldset': {
                            borderColor: 'rgba(15, 23, 42, 0.1)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(15, 23, 42, 0.2)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#7c3aed',
                            borderWidth: '2px',
                        },
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
                    boxShadow: 'none',
                    color: '#0f172a',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid rgba(15, 23, 42, 0.05)',
                },
            },
        },
    },
});

export default theme;
