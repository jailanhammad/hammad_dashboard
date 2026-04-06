import React, { useState } from 'react';
import './header.css';
import search from '../assets/home/search.svg';
import noti from '../assets/home/noti.svg';
import profile from '../assets/home/profile.svg';
import menu from '../assets/home/menu.svg';

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
 <>
 
 <header className="adm-header">
      <div className="adm-search-container">
        <i className="fas fa-search adm-search-icon">
            <img src={search} alt="search-icon" />
        </i>
        <input type="text" className="adm-search-input" placeholder="Search..." />
      </div>

      <div className="adm-header-right">
    <div className="adm-lang-pill">
        <button className="adm-lang-btn active">EN</button>
        <button className="adm-lang-btn">AR</button>
    </div>


    <div className="adm-notif-wrapper">
        <i className="far fa-bell">
        <img src={noti} alt="search-icon" />
        </i>
        <span className="adm-notif-badge"></span>
    </div>

</div>
      <div className="mobile-only adm-menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
        <i className="fas fa-ellipsis-v">
        <img src={menu} alt="search-icon" />
        </i>
        
        {showMobileMenu && (
          <div className="adm-mobile-dropdown">
            <div className="adm-mobile-item">
               <i className="far fa-bell"></i> Notifications
            </div>
            <div className="adm-mobile-item">
               <i className="fas fa-globe"></i> EN / AR
            </div>
          </div>
        )}
      </div>

      <div className="adm-profile-section">
        <div className="adm-profile-text desktop-only">
          <span className="adm-name">Admin User</span>
          <span className="adm-name-2">admin@hammadmotors.com</span>

        </div>
        <div className="adm-avatar-red">
           <i className="fas fa-user">
           <img src={profile} alt="search-icon" />
           </i>
        </div>
      </div>
    </header>
 
 </>
  );
};

export default Header;