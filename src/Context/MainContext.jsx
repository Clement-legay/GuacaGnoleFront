import React, {createContext, useState} from 'react';

export const MainContext = createContext({
    isDark: false,
    user: null,
});

export const MainProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [user, setUser] = useState(null);

    const state = { isDark, setIsDark, user, setUser };

    return (
        <MainContext.Provider value={state}>
            {children}
        </MainContext.Provider>
    );
};