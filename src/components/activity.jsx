import React from 'react';
import './activity.css';

const Activity = ({ activities }) => {
    return (
      <div className="adm-activity-container">
        <h3 className="adm-activity-title">Recent Activity</h3>
        <div className="adm-activity-list">
          {activities.map((act, index) => (
            <div 
              className="adm-activity-item" 
              key={index}
              style={{ "--delay": `${index * 0.1}s` }} 
            >
              <div className="adm-activity-avatar">
                <div className="adm-status-dot"></div>
                <span>{act.userName.charAt(0)}</span>
              </div>
              
              <div className="adm-activity-info">
                <div className="adm-activity-header">
                  <h4>{act.userName}</h4>
                  <span className="adm-activity-time">{act.time}</span>
                </div>
                <p className="adm-activity-text">{act.action}</p>
                <span className="adm-activity-tag">{act.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Activity;