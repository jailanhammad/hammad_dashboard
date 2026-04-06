import React from 'react';
import Cards from '../components/cards';

import './dashboard.css';
import chart from '../assets/home/chart1.svg';
import chart2 from '../assets/home/chart2.svg';
import Activity from './activity';

const Dashboard = () => {
    const activityData = [
        { userName: "Ahmed Hassan", action: "Placed a test drive booking", target: "BMW X5 2024", time: "5 min ago" },
        { userName: "Sarah Ali", action: "Left a 5-star review", target: "Mercedes C-Class", time: "12 min ago" },
        { userName: "Mohammed Khalid", action: "Submitted installment request", target: "Audi A6", time: "25 min ago" },
        { userName: "Fatma Ahmed", action: "Submitted sell request", target: "Toyota Corolla 2020", time: "1 hour ago" },

      ];
  return (

    <>
    
    
    <div className="adm-dashboard-view">

        <header className="adm-view-header">
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening with your business today.</p>
        </header>


        <Cards />

        <div className="adm-charts-grid">
        <div className="adm-chart-card">
            <h3>Sales Overview</h3>
            <div className="placeholder-chart">
                <img src={chart} alt="chart" />
            </div>
        </div>
        <div className="adm-chart-card">
            <h3>Revenue</h3>
            <div className="placeholder-chart">
            <img src={chart2} alt="chart" />
            </div>
        </div>
        </div>
        </div>


        <Activity activities={activityData} />

        </>


  );
};

export default Dashboard;