import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [isArabic, setIsArabic] = useState(() => {
        const savedLanguage = localStorage.getItem('appLanguage');
        return savedLanguage === 'ar';
    });

    const toggleLanguage = () => {
        setIsArabic((prev) => !prev);
    };

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

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};