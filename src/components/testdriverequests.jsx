import React from 'react';
import './testdriverequests.css';

const Testdriverequests = () => {
    return (
        <>
        

    <div class="hm-wrapper">
        <header class="hm-main-header">
            <div class="hm-title-area">
                <h1 class="hm-heading-primary">Test Drive Bookings</h1>
                <p class="hm-subtext">Manage test drive appointments</p>
            </div>
            <button class="hm-btn-action-red">
                <i class="fa-regular fa-calendar"></i> Calendar View
            </button>
        </header>

        <section class="hm-stats-container">
            <div class="hm-data-card">
                <i class="fa-regular fa-clock hm-icon-yellow"></i>
                <span class="hm-data-value">24</span>
                <span class="hm-data-label">Pending</span>
            </div>
            <div class="hm-data-card">
                <i class="fa-regular fa-circle-check hm-icon-green"></i>
                <span class="hm-data-value">156</span>
                <span class="hm-data-label">Confirmed</span>
            </div>
            <div class="hm-data-card">
                <i class="fa-regular fa-circle-xmark hm-icon-red"></i>
                <span class="hm-data-value">12</span>
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
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th class="hm-text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ahmed Hassan</td>
                            <td>BMW X5</td>
                            <td>Mar 18, 2026</td>
                            <td>10:00 AM</td>
                            <td><span class="hm-status-tag hm-status-pending">pending</span></td>
                            <td class="hm-text-end">
                                <button class="hm-btn-confirm">Confirm</button>
                                <button class="hm-btn-cancel">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Sarah Ali</td>
                            <td>Mercedes C-Class</td>
                            <td>Mar 19, 2026</td>
                            <td>2:00 PM</td>
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
 
export default Testdriverequests;