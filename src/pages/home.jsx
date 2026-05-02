import React, { useState } from 'react';
import './home.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Dashboard from '../components/dashboard';
import Seo from '../components/seo';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar  = () => setIsSidebarOpen(false);

    return (
        <div className="adm-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="adm-main-wrapper">
                <Header onMenuToggle={toggleSidebar} />

                <main className="adm-content-area">
                    <Dashboard />
                    <Seo />
                </main>
            </div>
        </div>
    );
};

export default Home;