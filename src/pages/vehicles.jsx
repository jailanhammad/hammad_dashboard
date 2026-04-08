import React from 'react';
import './vehicles.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';
import VehiclesManage from '../components/vehiclesmanage.jsx';

const Vehicles = () => {
  return ( 
    <>

    
    
        
    <div className="adm-layout">
            <Sidebar />

            <div className="adm-main-wrapper">
                <Header />

                <main className="adm-content-area">


            <VehiclesManage />
            <Seo />


                </main>
            </div>
    </div>
    
    
    
    
    
    
    </>
   );
}
 
export default Vehicles;