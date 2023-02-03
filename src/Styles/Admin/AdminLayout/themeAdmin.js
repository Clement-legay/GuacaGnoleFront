import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
            palette: {
                mode: 'light',
                primary: {
                    main: '#1976d2',
                },
                bg: {
                    main: "rgb(255,255,255)"
                },
                bgAlpha: {
                    main: "rgba(250,250,250,.3)"
                },
                bg2: {
                    main: "rgb(245,245,245)"
                },
                bg3: {
                    main: "rgb(230,230,230)"
                },
                text: {
                    primary: "rgb(45,45,45)",
                    secondary: "rgb(45,45,45)"
                },
            },
        });

export const darkTheme = createTheme({
            palette: {
                mode: 'dark',
                primary: {
                    main: '#1976d2',
                },
                secondary: {
                    main: '#1976d2',
                },
                bg: {
                    main: "rgb(15,15,15)"
                },
                bgAlpha: {
                    main: "rgba(0,0,0,.3)"
                },
                bg2: {
                    main: "rgb(30,30,30)"
                },
                bg3: {
                    main: "rgb(50,50,50)"
                },
                text: {
                    primary: "rgb(210,210,210)",
                    secondary: "rgb(210,210,210)"
                },
            }
});