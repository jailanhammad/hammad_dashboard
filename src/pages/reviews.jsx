import React from 'react';
import './reviews.css';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Seo from '../components/seo';
import CustomerReviews from '../components/customerreviews';

const Reviews = () => {
   return (
    <>
    
    <div className="adm-layout">
            <Sidebar />

            <div className="adm-main-wrapper">
                <Header />

                <main className="adm-content-area">


            <CustomerReviews />
            <Seo />






                </main>
            </div>
        </div>

        </>


   );
};

export default Reviews;