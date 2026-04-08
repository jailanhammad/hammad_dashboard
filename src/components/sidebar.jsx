import React from 'react';
import './sidebar.css';
import logo from '../assets/home/logo.svg';
import dash from '../assets/home/dash2.svg';
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
import { NavLink } from "react-router-dom";


const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: dash, path: '/' },
        { name: 'Website', icon: web, path: '/website' },
        { name: 'Mobile App', icon: app, path: '/mobile-app' },
        { name: 'Vehicles', icon: car, path: '/vehicles' },
        { name: 'Brands', icon: brands, path: '/brands' },
        { name: 'Test Drives', icon: test, path: '/test-drive' },
        { name: 'Installments', icon: installments, path: '/installments' },
        { name: 'Sell Requests', icon: sell, path: '/sell-requests' },
        { name: 'Reviews', icon: reviews, path: '/reviews' },
        { name: 'Notifications', icon: notifications, path: '/notifications' },
        { name: 'Settings', icon: settings, path: '/settings' },
    ];

    return (
        <aside className="adm-sidebar">
            <div className="adm-sidebar-header">
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
                    <NavLink 
                        key={item.name}
                        to={item.path} 
                        className={({ isActive }) => `adm-sidebar-link ${isActive ? 'is-active' : ''}`}
                    >
                        <div className="adm-sidebar-item">
                            <i>
                                <img src={item.icon} alt={item.name} className="adm-nav-icon" />
                            </i>
                            <span className="adm-item-name">{item.name}</span>
                        </div>
                    </NavLink>
                ))}
            </nav>

            <div className="adm-sidebar-footer">
                <i>
                    <img src={side} alt="close-icon" />
                </i>
            </div>
        </aside>
    );
};

export default Sidebar;