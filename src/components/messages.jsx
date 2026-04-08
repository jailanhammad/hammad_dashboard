import React from 'react';
import './messages.css';
import notification from '../assets/home/notification.svg';


const Messages = () => {
    return ( 
        <>
        
        <div class="act-container">
        <header class="act-header">
            <h1 class="act-main-title">Notifications</h1>
            <p class="act-sub-title">Send push notifications and announcements</p>
        </header>

        <div class="act-grid-layout">
            
            <section class="act-card act-form-section">
                <h2 class="act-card-title">Send Notification</h2>
                
                <div class="act-field-group">
                    <label class="act-label">Target Audience</label>
                    <select class="act-select">
                        <option>All users</option>
                        <option>Web Users</option>
                        <option>App Users</option>
                        <option>Subscribers</option>
                    </select>
                </div>

                <div class="act-field-group">
                    <label class="act-label">Notification Title</label>
                    <div class="act-tabs">
                        <span class="act-tab active">EN (English)</span>
                        <span class="act-tab">AR (العربية)</span>
                    </div>
                    <input type="text" class="act-input" placeholder="Enter title"/>
                </div>

                <div class="act-field-group">
                    <label class="act-label">Notification Message</label>
                    <div class="act-tabs">
                        <span class="act-tab active">EN (English)</span>
                        <span class="act-tab">AR (العربية)</span>
                    </div>
                    <textarea class="act-textarea" placeholder="Enter message"></textarea>
                </div>

                <button class="act-btn-send">
                    <i class="fa-regular fa-paper-plane"></i> Send Notification
                </button>
            </section>

            <section class="act-card act-recent-section">
                <h2 class="act-card-title">Recent Notifications</h2>
                
                <div class="act-list">
                    <div class="act-item">
                        <div class="act-icon-box">
                            <i class="fa-regular fa-bell">
                                <img src={notification} alt="notification-icon" />
                            </i>
                        </div>
                        <div class="act-item-content">
                            <h4 class="act-item-title">New Offer</h4>
                            <p class="act-item-desc">20% off on selected vehicles</p>
                            <span class="act-item-time">2 hours ago</span>
                        </div>
                    </div>

                    <div class="act-item">
                        <div class="act-icon-box">
                            <i class="fa-regular fa-bell">
                            <img src={notification} alt="notification-icon" />
                            </i>
                        </div>
                        <div class="act-item-content">
                            <h4 class="act-item-title">Service Reminder</h4>
                            <p class="act-item-desc">Time for your regular service</p>
                            <span class="act-item-time">1 day ago</span>
                        </div>
                    </div>

                    <div class="act-item">
                        <div class="act-icon-box">
                            <i class="fa-regular fa-bell">
                            <img src={notification} alt="notification-icon" />
                            </i>
                        </div>
                        <div class="act-item-content">
                            <h4 class="act-item-title">New Arrivals</h4>
                            <p class="act-item-desc">Check out our latest inventory</p>
                            <span class="act-item-time">2 days ago</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>
        
        
        
        
        
        
        </>
     );
}
 
export default Messages;