import React, { useState } from 'react';
import './header.css';
import { supabase } from '../supabase'; 
import search from '../assets/home/search.svg';
// import noti from '../assets/home/noti.svg';
import profile from '../assets/home/profile.svg';
import { NavLink } from "react-router-dom";
import { useEffect } from 'react';

const Header = ({ onMenuToggle }) => {
    const [adminName, setAdminName] = useState('Admin User');
    const [adminEmail, setAdminEmail] = useState('admin@hammadmotors.com');

    useEffect(() => {
        const getAdminData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setAdminName(user.user_metadata.full_name || ' Welcome Jailan');
                setAdminEmail(user.email);
            }
        };
        getAdminData();
    }, []);

    return (
        <header className="adm-header">
            <button
                className="adm-hamburger"
                onClick={onMenuToggle}
                aria-label="Toggle navigation menu"
            >
                <span className="adm-hamburger-bar"></span>
                <span className="adm-hamburger-bar"></span>
                <span className="adm-hamburger-bar"></span>
            </button>

            <div className="adm-search-container">
                <i className="fas fa-search adm-search-icon">
                    <img src={search} alt="search-icon" />
                </i>
                <input type="text" className="adm-search-input" placeholder="Search..." />
            </div>

            {/* <div className="adm-header-right">
                <div className="adm-lang-pill">
                    <button className="adm-lang-btn active">EN</button>
                    <button className="adm-lang-btn">AR</button>
                </div>

                <div className="adm-notif-wrapper">
                    <i className="far fa-bell">
                        <img src={noti} alt="notification-icon" />
                    </i>
                    <span className="adm-notif-badge"></span>
                </div>
            </div> */}

            <div className="adm-profile-section">
                <div className="adm-profile-text">
                    <span className="adm-name">{adminName}</span>
                    <span className="adm-name-2">{adminEmail}</span>
                </div>
                <NavLink to="/">
                    <div className="adm-avatar-red">
                        <i className="fas fa-user">
                            <img src={profile} alt="profile-icon" />
                        </i>
                    </div>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;