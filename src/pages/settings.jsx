import React from 'react';
import './notifications.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';
import SettingsComponent from '../components/settingscomponent';

const Settings = () => {
   return (
    <>
    
    <div className="adm-layout">
            <Sidebar />

            <div className="adm-main-wrapper">
                <Header />

                <main className="adm-content-area">


            <SettingsComponent />
            <Seo />



                </main>
            </div>
        </div>

        </>


   );
};

export default Settings;