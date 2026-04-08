import React from 'react';
import './installments.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';
import SellRequests from '../components/sellrequests';

const Sell = () => {
   return (
    <>
    
    <div className="adm-layout">
            <Sidebar />

            <div className="adm-main-wrapper">
                <Header />

                <main className="adm-content-area">


            <SellRequests />
            <Seo />






                </main>
            </div>
        </div>

        </>


   );
};

export default Sell;