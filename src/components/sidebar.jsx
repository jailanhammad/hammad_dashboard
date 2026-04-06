import React, { useState } from 'react';
import './sidebar.css';
import logo from '../assets/home/logo.svg';
import dash from '../assets/home/panel-icon-1.svg';
import web from '../assets/home/panel-icon-2.svg';
import app from '../assets/home/panel-icon-3.svg';
import car from '../assets/home/panel-icon-4.svg';
import brands from '../assets/home/panel-icon-5.svg';
import test from '../assets/home/panel-icon-6.svg';
import installments from '../assets/home/panel-icon-7.svg';
import sell from '../assets/home/panel-icon-8.svg';
import reviews from '../assets/home/panel-icon-9.svg';
import notifications from '../assets/home/panel-icon-10.svg';
import settings from '../assets/home/panel-icon-11.svg';
import side from '../assets/home/panel-icon-12.svg';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const menuItems = [
        { name: 'Dashboard', icon: dash },
        { name: 'Website', icon: web },
        { name: 'Mobile App', icon: app },
        { name: 'Vehicles', icon: car },
        { name: 'Brands', icon: brands },
        { name: 'Test Drives', icon: test },
        { name: 'Installments', icon: installments },
        { name: 'Sell Requests', icon: sell},
        { name: 'Reviews', icon: reviews},
        { name: 'Notifications', icon: notifications },
        { name: 'Settings', icon: settings},
    ];

    return (
        <aside className="adm-sidebar">
            <div className="adm-sidebar-header">
                {/* Your Logo Img here */}
                <div className="adm-logo-icon">
                    <img src={logo} alt="logo" />
                </div>
                <div className="adm-logo-text">
                    <h2>HAMMAD MOTORS</h2>
                    <span>Admin Panel</span>
                </div>
            </div>

            <nav className="adm-sidebar-nav">
                {menuItems.map((item) => (
                    <div 
                        key={item.name}
                        className={`adm-sidebar-item ${activeItem === item.name ? 'active' : ''}`}
                        onClick={() => setActiveItem(item.name)}
                    >
                        <i>
                            <img src={item.icon} alt="icons" />
                        </i>
                        <span className="adm-item-name">{item.name}</span>
                    </div>
                ))}
            </nav>

            <div className="adm-sidebar-footer">
                <i className="fas fa-chevron-left">
                    <img src={side} alt="close-icon" />
                </i>
            </div>
        </aside>
    );
};

export default Sidebar;