import React from 'react';
import Cards from '../components/cards';
import './dashboard.css';
import chart from '../assets/home/chart1.svg';
import chart2 from '../assets/home/chart2.svg';

const Dashboard = () => {
  return (
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


  );
};

export default Dashboard;