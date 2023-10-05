import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState({});
    return (
        <AppContext.Provider value={{ sharedData, setSharedData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
