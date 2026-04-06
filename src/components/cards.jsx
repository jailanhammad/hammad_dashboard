import React from 'react';
import { motion } from 'framer-motion';
import './cards.css';
import icon1 from '../assets/home/car.svg';
import icon2 from '../assets/home/basket.svg';
import icon3 from '../assets/home/people.svg';
import icon4 from '../assets/home/money.svg';


const Cards = () => {
  const stats = [
    { title: "Total Vehicles", value: "284", trend: "+12%", color: "green", icon: icon1 },
    { title: "Total Orders", value: "156", trend: "+8%", color: "green" , icon: icon2},
    { title: "Total Users", value: "2,543", trend: "+24%", color: "green" , icon: icon3},
    { title: "Revenue", value: "$1.2M", trend: "-5%", color: "red", icon: icon4 },
  ];

  return (
    <div className="adm-cards-container">
      {stats.map((item, index) => (
        <motion.div 
          key={index}
          className="adm-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="adm-card-top">
            <div className="adm-icon-box">
              <i className="fas fa-car">
                    <img src={item.icon} alt="car-icon" />
              </i> 
            </div>
            <span className={`adm-trend ${item.color}`}>{item.trend}</span>
          </div>
          <div className="adm-card-info">
            <h2 className="adm-card-value">{item.value}</h2>
            <p className="adm-card-title">{item.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Cards;