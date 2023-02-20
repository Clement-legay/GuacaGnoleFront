import { createTheme } from "@mui/material/styles";;
const Neuee = require('../../../Assets/fonts/neue-haas-grotesk-display-pro-cufonfonts/NeueHaasDisplayRoman.ttf');
const Poppins = require('../../../Assets/fonts/Poppins/Poppins-Regular.ttf');

// const getTheme = (mode) => ({
//     palette: mode === "dark" ? {
//         mode: 'dark',
//         primary: {
//             main: '#367af8',
//         },
//         secondary: {
//             main: '#8539fd',
//         },
//         warning: {
//             main: '#f8c02b',
//         },
//         error: {
//             main: '#f81537',
//         },
//         success: {
//             main: '#18fa7a',
//         },
//         background: {
//             default: '#1e1e1e',
//             paper: '#272727',
//             navbar: '#886854',
//         },
//         text: {
//             title: '#fff',
//             subtitle: '#fff',
//             primary: '#ffffff',
//             secondary: '#c7c6c6',
//             altPrimary: '#85b0ff',
//         }
//     } : {
//
//         mode: 'light',
//         primary: {
//             main: '#3a86ff',
//         },
//         secondary: {
//             main: '#8338ec',
//         },
//         warning: {
//             main: '#ffbe0b',
//         },
//         error: {
//             main: '#ff006e',
//         },
//         success: {
//             main: '#06d6a0',
//         },
//         background: {
//             default: '#f4f6f8',
//             paper: '#ffffff',
//             navbar: '#000000',
//         },
//         text: {
//             title: '#ffffff',
//             subtitle: '#ffffff',
//             primary: '#1e1e1e',
//             secondary: '#272727',
//             altPrimary: '#0e1f3b',
//             titleNavClose : '#ffffff',
//             titleNavOpen : '#000000',
//         }
//     }
//
// });

// const ThemeCustomer = (theme, setTheme) => {
//
//     if (theme === null) {
//         if (Cookies.get('theme') === 'dark') {
//             setTheme('dark');
//         } else {
//             setTheme('light');
//         }
//     }
//     Cookies.set('theme', theme);
//
//     return
//
// export default ThemeCustomer;

const ThemeCustomer = () => (
    createTheme({
            palette: {
                mode: 'light',
                primary: {
                    main: '#3a86ff',
                },
                secondary: {
                    main: '#8338ec',
                },
                warning: {
                    main: '#ffbe0b',
                },
                error: {
                    main: '#ff006e',
                },
                success: {
                    main: '#06d6a0',
                },
                background: {
                    default: '#f4f6f8',
                    paper: '#ffffff',
                    navbar: '#000000',
                },
                text: {
                    title: '#ffffff',
                    subtitle: '#ffffff',
                    primary: '#111111',
                    secondary: '#272727',
                    altPrimary: '#313133',
                    titleNavClose : '#ffffff',
                    titleNavOpen : '#000000',
                }
            },
            typography: {
                fontFamily: [
                    'Neuee',
                    'Poppins',
                ]
            },
            overrides: {
                // change color of the body tag in the admin layout
                MuiCssBaseline: {
                    styleOverrides: {
                        body: {
                            backgroundColor: "#f4f6f8",
                        },
                        fontFamily: [
                            'Neuee',
                            'Poppins',
                        ].join(','),
                    },
                    '@global': {
                        '@font-face': [Neuee, Poppins],
                    },
                }
            }
        }
    )
);

export default ThemeCustomer;