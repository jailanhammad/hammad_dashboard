import React from 'react';
import './vehiclesmanage.css';
import eye2 from '../assets/home/eye2.svg';
import edit2 from '../assets/home/edit2.svg';
import delete2 from '../assets/home/delete2.svg';

const VehiclesManage = () => {
  const inventory = [
    { id: "V-8821", name: "Mercedes-Benz C180", cat: "Avantgarde Plus", year: 2023, price: "2,800,000 EGP", status: "In Stock" },
    { id: "V-9930", name: "Jeep Cherokee", cat: "Limited Edition", year: 2022, price: "3,200,000 EGP", status: "In Stock" }
  ];

  return (
    <div className="hm-admin-layout">
      <main className="hm-main-content">
        <header className="hm-page-header">
          <div className="hm-title-zone">
            <h1>Vehicles Management</h1>
            <p>Manage your vehicle inventory</p>
          </div>
          <button className="hm-add-btn">+ Add New Vehicle</button>
        </header>

        <section className="hm-analytics-grid">
          <div className="hm-stat-card"><label>Total Fleet</label><h3>284</h3></div>
          <div className="hm-stat-card"><label>Ready to Sell</label><h3 className="txt-green">192</h3></div>
          <div className="hm-stat-card"><label>Sold This Month</label><h3 className="txt-red">78</h3></div>
          <div className="hm-stat-card"><label>In Maintenance</label><h3 className="txt-yellow">14</h3></div>
        </section>

        <div className="hm-inventory-section">
          <div className="hm-section-top">
            <h3>Live Inventory</h3>
            <div className="hm-filter-bar">
              <input type="text" placeholder="Search vehicles..." />
              <select><option>All Brands</option></select>
              <select><option>Used</option></select>
            </div>
          </div>

          <div className="hm-table-scroll">
            <table className="hm-data-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(car => (
                  <tr key={car.id}>
                    <td className="hm-car-cell">
                      <div className="hm-car-img-placeholder"></div>
                      <div><b>{car.name}</b><br/><small>ID: {car.id}</small></div>
                    </td>
                    <td>{car.cat}</td>
                    <td>{car.year}</td>
                    <td className="hm-price-bold">{car.price}</td>
                    <td><span className="hm-badge">Available</span></td>
                    <td className="hm-actions-cell">
                        <img src={eye2} alt="" />
                        <img src={edit2} alt="" />
                        <img src={delete2} alt="" />

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehiclesManage;