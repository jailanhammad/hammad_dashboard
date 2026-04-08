import React from 'react';
import './testdriverequests.css';
import pending from '../assets/home/pending.svg';
import confirm from '../assets/home/confirm.svg';
import reject from '../assets/home/reject.svg';

const InstalmentRequests = () => {
    return (
        <>
        

    <div class="hm-wrapper">
        <header class="hm-main-header">
            <div class="hm-title-area">
                <h1 class="hm-heading-primary">Installment Requests</h1>
                <p class="hm-subtext">Manage financing and installment applications</p>
            </div>
            <button class="hm-btn-action-red">
                <i class="fa-regular fa-calendar"></i> Calendar View
            </button>
        </header>

        <section class="hm-stats-container">
            <div class="hm-data-card">
                <i class="fa-regular fa-clock hm-icon-yellow">
                    <img src={pending} alt="pending-icon" />
                </i>
                <span class="hm-data-value">12</span>
                <span class="hm-data-label">Pending</span>
            </div>
            <div class="hm-data-card">
                <i class="fa-regular fa-circle-check hm-icon-green">
                <img src={confirm} alt="pending-icon" />
                </i>
                <span class="hm-data-value">127</span>
                <span class="hm-data-label">Confirmed</span>
            </div>
            <div class="hm-data-card">
                <i class="fa-regular fa-circle-xmark hm-icon-red">
                <img src={reject} alt="pending-icon" />
                </i>
                <span class="hm-data-value">9</span>
                <span class="hm-data-label">Cancelled</span>
            </div>
        </section>


        <section class="hm-records-panel">
            <div class="hm-panel-top">
                <h2 class="hm-panel-title">All Bookings</h2>
            </div>
            <div class="hm-table-responsive-box">
                <table class="hm-data-table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Vehicle</th>
                            <th>Amount</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th class="hm-text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mohamed Samy</td>
                            <td>Hyundai Cn7</td>
                            <td>500,000</td>
                            <td>48 months</td>
                            <td><span class="hm-status-tag hm-status-pending">pending</span></td>
                            <td class="hm-text-end">
                                <button class="hm-btn-confirm">Confirm</button>
                                <button class="hm-btn-cancel">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Ahmed Ashraf</td>
                            <td>Mercedes C-Class</td>
                            <td>1,500,000</td>
                            <td>36 months</td>
                            <td><span class="hm-status-tag hm-status-confirmed">confirmed</span></td>
                            <td class="hm-text-end">
                                <button class="hm-btn-confirm">Confirm</button>
                                <button class="hm-btn-cancel">Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>


        
        
        
        
        </>
      );
}
 
export default InstalmentRequests;