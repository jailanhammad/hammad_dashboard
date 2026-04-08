import React from 'react';
import './installments.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';
import InstalmentRequests from '../components/installmentrequests';

const Installments = () => {
   return (
    <>
    
    <div className="adm-layout">
            <Sidebar />

            <div className="adm-main-wrapper">
                <Header />

                <main className="adm-content-area">


            <InstalmentRequests />
            <Seo />






                </main>
            </div>
        </div>

        </>


   );
};

export default Installments;