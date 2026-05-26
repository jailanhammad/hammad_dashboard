import React, { useState } from 'react';
import './website.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';
import RecommendedWebPage from '../components/recommendedwebpage';

const RecommendedWebsite = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar  = () => setIsSidebarOpen(false);

    return (
        <>
        
        <div className="adm-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="adm-main-wrapper">
                <Header onMenuToggle={toggleSidebar} />

                <main className="adm-content-area">
                    <RecommendedWebPage />
                    <Seo />
                </main>
            </div>
        </div>

        
        </>
    );
};

export default RecommendedWebsite;