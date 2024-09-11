// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Set the initial theme from localStorage or fallback to 'light'
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // Apply the theme to the document class
        document.documentElement.className = theme;
        // Save the theme in localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        // Toggle between 'light' and 'dark' themes
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
