import React, {createContext, useState} from 'react';

export const MainContext = createContext({
    themeStyle: "dark",
    user: null,
    theme: null,
});

export const MainProvider = ({ children }) => {
    const [themeStyle, setThemeStyle] = useState("dark");
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(null);

    const state = { theme, setTheme, user, setUser, themeStyle, setThemeStyle };

    return (
        <MainContext.Provider value={state}>
            {children}
        </MainContext.Provider>
    );
};