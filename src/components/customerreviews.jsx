import React from 'react';
import './customerreviews.css';
import confirmed from '../assets/home/confirmed.svg';
import eye3 from '../assets/home/eye3.svg';
import reject from '../assets/home/reject.svg';

const CustomerReviews = () => {
    return ( 
        <>
        
        
        <div class="rev-dash-container">
        <header class="rev-dash-header">
            <h1 class="rev-main-title">Customer Reviews</h1>
            <p class="rev-sub-title">Manage and moderate customer reviews</p>
        </header>

        <section class="rev-metrics-grid">
            <div class="rev-metric-box">
                <span class="rev-metric-value">4.8</span>
                <span class="rev-metric-label">Average Rating</span>
            </div>
            <div class="rev-metric-box">
                <span class="rev-metric-value">234</span>
                <span class="rev-metric-label">Total Reviews</span>
            </div>
            <div class="rev-metric-box">
                <span class="rev-metric-value rev-text-green">198</span>
                <span class="rev-metric-label">Approved</span>
            </div>
            <div class="rev-metric-box">
                <span class="rev-metric-value rev-text-gold">36</span>
                <span class="rev-metric-label">Pending</span>
            </div>
        </section>

        <div class="rev-items-stack">
            
            <article class="rev-card-item">
                <div class="rev-card-body">
                    <div class="rev-user-section">
                        <div class="rev-avatar">A</div>
                        <div class="rev-user-info">
                            <h3 class="rev-user-name">Ahmed Hassan</h3>
                            <p class="rev-car-meta">BMW X5 • Mar 15, 2026</p>
                        </div>
                    </div>
                    <div class="rev-stars">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </div>
                    <p class="rev-comment">Excellent service and amazing car!</p>
                </div>
                
                <div class="rev-card-actions">
                    <span class="rev-status-label rev-status-pending">pending</span>
                    <div class="rev-action-buttons">
                        <button class="rev-btn-icon rev-btn-approve"><i class="fa-solid fa-check"></i>
                        <img src={confirmed} alt="confirmed" />
                        </button>
                        <button class="rev-btn-icon rev-btn-view"><i class="fa-regular fa-eye"></i>
                        <img src={eye3} alt="confirmed" />
                        </button>
                        <button class="rev-btn-icon rev-btn-delete"><i class="fa-solid fa-xmark"></i>
                        <img src={reject} alt="confirmed"  className='reject-icon'/>
                        </button>
                    </div>
                </div>
            </article>

            <article class="rev-card-item">
                <div class="rev-card-body">
                    <div class="rev-user-section">
                        <div class="rev-avatar rev-avatar-alt">S</div>
                        <div class="rev-user-info">
                            <h3 class="rev-user-name">Sarah Ali</h3>
                            <p class="rev-car-meta">Mercedes C-Class • Mar 14, 2026</p>
                        </div>
                    </div>
                    <div class="rev-stars">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                    </div>
                    <p class="rev-comment">Great experience overall</p>
                </div>
                
                <div class="rev-card-actions">
                    <span class="rev-status-label rev-status-approved">approved</span>
                    <div class="rev-action-buttons">
                    <button class="rev-btn-icon rev-btn-approve"><i class="fa-solid fa-check"></i>
                        <img src={confirmed} alt="confirmed" />
                        </button>
                        <button class="rev-btn-icon rev-btn-view"><i class="fa-regular fa-eye"></i>
                        <img src={eye3} alt="confirmed" />
                        </button>
                        <button class="rev-btn-icon rev-btn-delete"><i class="fa-solid fa-xmark"></i>
                        <img src={reject} alt="confirmed"  className='reject-icon'/>
                    </button>
                    </div>
                </div>
            </article>

        </div>
    </div>
        
        
        
        </>
     );
}
 
export default CustomerReviews;