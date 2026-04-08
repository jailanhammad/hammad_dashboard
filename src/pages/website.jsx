import React from 'react';
import './website.css';
import WebManagement from '../components/webmanagement';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';

const Website = () => {
  return ( 
    <>
    
    
    
    
        
    <div className="adm-layout">
            <Sidebar />

            <div className="adm-main-wrapper">
                <Header />

                <main className="adm-content-area">


            <WebManagement />
            <Seo />






                </main>
            </div>
    </div>
    
    
    
    
    
    
    </>
   );
}
 
export default Website;