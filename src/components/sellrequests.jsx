import React from 'react';
import './sellrequests.css';
import reject from '../assets/home/reject.svg';

const SellRequests = () => {
    return ( 
        <>
        
        <div class="h-motors-container">
        <header class="h-motors-header">
            <h1 class="h-main-heading">Sell Your Car Requests</h1>
            <p class="h-sub-heading">Manage customer car selling requests</p>
        </header>

        <div class="h-request-stream">
            
            <article class="h-entry-card">
                <div class="h-entry-layout">
                    <div class="h-entry-media">
                        <span class="h-car-icon">🚗</span>
                    </div>
                    
                    <div class="h-entry-content">
                        <div class="h-entry-header">
                            <div class="h-car-meta">
                                <h2 class="h-car-title">Toyota Corolla 2020</h2>
                                <p class="h-car-owner">Owner: Ahmed Hassan</p>
                            </div>
                            <span class="h-status-pill h-status-wait">pending</span>
                        </div>

                        <div class="h-specs-grid">
                            <div class="h-spec-item">
                                <span class="h-spec-label">Asking Price</span>
                                <span class="h-spec-value h-text-gold">900,000</span>
                            </div>
                            <div class="h-spec-item">
                                <span class="h-spec-label">Year</span>
                                <span class="h-spec-value">2020</span>
                            </div>
                            <div class="h-spec-item">
                                <span class="h-spec-label">Mileage</span>
                                <span class="h-spec-value">45,000 km</span>
                            </div>
                        </div>

                        <div class="h-entry-footer">
                            <button class="h-btn h-btn-primary"><i class="fa-regular fa-circle-check"></i> Accept</button>
                            <button class="h-btn h-btn-secondary">View Details</button>
                            <button class="h-btn h-btn-ghost">
                            <i class="fa-regular fa-circle-xmark">
                                <img src={reject} alt="reject-icon" className='reject-icon' />
                            </i> Reject</button>
                        </div>
                    </div>
                </div>
            </article>

            <article class="h-entry-card">
                <div class="h-entry-layout">
                    <div class="h-entry-media">
                        <span class="h-car-icon">🚗</span>
                    </div>
                    
                    <div class="h-entry-content">
                        <div class="h-entry-header">
                            <div class="h-car-meta">
                                <h2 class="h-car-title">Nissan Sunny 2021</h2>
                                <p class="h-car-owner">Owner: Mohammed K.</p>
                            </div>
                            <span class="h-status-pill h-status-done">accepted</span>
                        </div>

                        <div class="h-specs-grid">
                            <div class="h-spec-item">
                                <span class="h-spec-label">Asking Price</span>
                                <span class="h-spec-value h-text-gold">600,000</span>
                            </div>
                            <div class="h-spec-item">
                                <span class="h-spec-label">Year</span>
                                <span class="h-spec-value">2021</span>
                            </div>
                            <div class="h-spec-item">
                                <span class="h-spec-label">Mileage</span>
                                <span class="h-spec-value">30,000 km</span>
                            </div>
                        </div>

                        <div class="h-entry-footer">
                            <button class="h-btn h-btn-primary"><i class="fa-regular fa-circle-check"></i> Accept</button>
                            <button class="h-btn h-btn-secondary">View Details</button>
                            <button class="h-btn h-btn-ghost">
                            <i class="fa-regular fa-circle-xmark">
                                <img src={reject} alt="reject-icon" className='reject-icon' />
                            </i> Reject</button>
                        </div>
                    </div>
                </div>
            </article>

        </div>
    </div>
        
        
        
        
        
     
        
        </>
     );
}
 
export default SellRequests;