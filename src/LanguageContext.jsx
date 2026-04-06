import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
const LanguageContext = createContext();

// 2. Create the Provider Component
export const LanguageProvider = ({ children }) => {
    // Check if a language was already saved in the browser, otherwise default to English
    const [isArabic, setIsArabic] = useState(() => {
        const savedLanguage = localStorage.getItem('appLanguage');
        return savedLanguage === 'ar';
    });

    // Toggle function
    const toggleLanguage = () => {
        setIsArabic((prev) => !prev);
    };

    // Update the HTML 'dir' attribute and save preference whenever language changes
    useEffect(() => {
        const lang = isArabic ? 'ar' : 'en';
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        localStorage.setItem('appLanguage', lang);
    }, [isArabic]);

    return (
        <LanguageContext.Provider value={{ isArabic, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// 3. Custom Hook for easy use in your components
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};