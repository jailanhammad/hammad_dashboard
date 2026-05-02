import React, { useState } from 'react';
import './app.css';
import AppManagement from '../components/appmanagement';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar  = () => setIsSidebarOpen(false);

    return (
        <div className="adm-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="adm-main-wrapper">
                <Header onMenuToggle={toggleSidebar} />

                <main className="adm-content-area">
                    <AppManagement />
                    <Seo />
                </main>
            </div>
        </div>
    );
};

export default App;