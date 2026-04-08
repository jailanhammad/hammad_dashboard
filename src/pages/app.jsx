import React from 'react';
import './app.css';
import AppManagement from '../components/appmanagement';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';

const App = () => {
  return ( 
    <>
    
    
    <div className="adm-layout">
            <Sidebar />

            <div className="adm-main-wrapper">
                <Header />

                <main className="adm-content-area">


            <AppManagement />
            <Seo />






                </main>
            </div>
    </div>
    
    
    
    
    
    
    </>
   );
}
 
export default App;