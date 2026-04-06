import React from 'react';
import './home.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Dashboard from '../components/dashboard';

const Home = () => {
   return (
    <>
    
    <div className="adm-layout">
            <Sidebar />

            <div className="adm-main-wrapper">
                <Header />

                <main className="adm-content-area">


            <Dashboard />






                </main>
            </div>
        </div>

        </>


   );
};

export default Home;