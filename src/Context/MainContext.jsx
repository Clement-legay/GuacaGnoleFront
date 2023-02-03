import React, {createContext, useState} from 'react';

export const MainContext = createContext({
    theme: "light",
    user: null,
});

export const MainProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [user, setUser] = useState(null);

    const state = { theme, setTheme, user, setUser };

    return (
        <MainContext.Provider value={state}>
            {children}
        </MainContext.Provider>
    );
};