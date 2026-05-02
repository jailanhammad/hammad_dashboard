import React, { useState } from 'react';
import './vehicles.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';
import VehiclesManage from '../components/vehiclesmanage.jsx';

const Vehicles = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar  = () => setIsSidebarOpen(false);

    return (
        <div className="adm-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="adm-main-wrapper">
                <Header onMenuToggle={toggleSidebar} />

                <main className="adm-content-area">
                    <VehiclesManage />
                    <Seo />
                </main>
            </div>
        </div>
    );
};

export default Vehicles;