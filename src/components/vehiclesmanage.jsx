import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase'; 
import './vehiclesmanage.css';
import edit2 from '../assets/home/edit2.svg';
import delete2 from '../assets/home/delete2.svg';
import { useNavigate } from 'react-router-dom'; 

const VehiclesManage = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);



  const [newVehicle, setNewVehicle] = useState({
    name_en: '', 
    name_ar: '', 
    category: '', 
    year: 2024, 
    price: 0, 
    mileage: 0, 
    fuel_type_en: 'gasoline', 
    is_instock: true, 
    condition_en: 'used', 
    thumbnail_url: ''
});




  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('vehiclescards')
      .select('*')
      .order('id', { ascending: true });
  
    if (!error) {
      setInventory(data);
    }
    setLoading(false);
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    
    const vehicleData = {
        ...newVehicle,
        price: parseInt(newVehicle.price),
        year: parseInt(newVehicle.year),
        mileage: parseInt(newVehicle.mileage)
    };

    const { data, error } = await supabase
        .from('vehiclescards')
        .insert([vehicleData])
        .select();

    if (error) {
        alert("Error: " + error.message);
    } else {
        setInventory([data[0], ...inventory]);
        setShowModal(false);
        alert(`${newVehicle.name_en} added successfully!`);
    }
};

  const handleDelete = async (id, carName) => {
    const isConfirmed = window.confirm(`⚠️ Delete ${carName}?\nThis will permanently remove it from Hammad Motors.`);
    
    if (isConfirmed) {
        const { error } = await supabase
            .from('vehiclescards')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Error: " + error.message);
        } else {
            setInventory(prev => prev.filter(car => car.id !== id));
        }
    }
};

  const totalFleet = inventory.length;
  const readyToSell = inventory.filter(car => car.is_instock).length;
  const soldCount = inventory.filter(car => !car.is_instock).length;

  return (
    <div className="hm-admin-layout">

      
{showModal && (
  <div className="hm-glass-overlay">
    <div className="hm-chic-modal">
      <div className="hm-modal-header">
        <div className="header-text">
          <h2>Add New Vehicle</h2>
          <p>Fill in the details to update Hammad Motors fleet.</p>
        </div>
        <button className="hm-close-chic" onClick={() => setShowModal(false)}>×</button>
      </div>

      <form onSubmit={handleAddVehicle} className="hm-chic-form">
        <div className="form-row">
          <div className="input-field">
            <label>Name (English)</label>
            <input type="text" placeholder="e.g. Mercedes S-Class" required
              onChange={e => setNewVehicle({...newVehicle, name_en: e.target.value})} />
          </div>
          <div className="input-field">
            <label>الاسم (عربي)</label>
            <input type="text" placeholder="مرسيدس" className="text-right" required
              onChange={e => setNewVehicle({...newVehicle, name_ar: e.target.value})} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-field">
            <label>Price (EGP)</label>
            <input type="number" placeholder="0.00" required
              onChange={e => setNewVehicle({...newVehicle, price: e.target.value})} />
          </div>
          <div className="input-field">
            <label>Year</label>
            <input type="number" placeholder="2024"
              onChange={e => setNewVehicle({...newVehicle, year: e.target.value})} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-field">
            <label>Category</label>
            <select onChange={e => setNewVehicle({...newVehicle, category: e.target.value})}>
              <option value="">Select Category</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Sport">Sport</option>
            </select>
          </div>
          <div className="input-field">
            <label>Thumbnail Image URL</label>
            <input type="text" placeholder="https://image-link.com"
              onChange={e => setNewVehicle({...newVehicle, thumbnail_url: e.target.value})} />
          </div>
        </div>

        <button type="submit" className="hm-gradient-btn">
          <span>Confirm & Upload</span>
        </button>
      </form>
    </div>
  </div>
)}
      <main className="hm-main-content">
        <header className="hm-page-header">
          <div className="hm-title-zone">
            <h1>Vehicles Management</h1>
            <p>Manage your vehicle inventory</p>
          </div>
          <button className="hm-add-btn" onClick={() => setShowModal(true)}>
            + Add New Vehicle
          </button>        </header>

        <section className="hm-analytics-grid">
          <div className="hm-stat-card"><label>Total Fleet</label><h3>{totalFleet}</h3></div>
          <div className="hm-stat-card"><label>Ready to Sell</label><h3 className="txt-green">{readyToSell}</h3></div>
          <div className="hm-stat-card"><label>Sold Inventory</label><h3 className="txt-red">{soldCount}</h3></div>
          <div className="hm-stat-card"><label>Database Status</label><h3 className="txt-yellow">Live</h3></div>
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
  {loading ? (
    <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Loading Hammad Motors Data...</td></tr>
  ) : (
    inventory.map((car, index) => ( 
      <tr key={car.id}>
        <td className="hm-car-cell">
          <div className="hm-car-cell"> 
            <img src={car.thumbnail_url} alt="" />
            <div>
              <b>{car.name_en}</b><br/>
              <small>ID: #{index + 1}</small>
            </div>
          </div>
        </td>
        <td>{car.category}</td>
        <td>{car.year}</td>
        <td className="hm-price-bold">{car.price?.toLocaleString()} EGP</td>
        <td>
          <span className={`hm-badge ${car.is_instock ? 'available' : 'sold'}`}>
            {car.is_instock ? 'Available' : 'Sold Out'}
          </span>
        </td>
        <td className="hm-actions-cell">
          <img 
            src={edit2} 
            alt="Edit" 
            style={{cursor: 'pointer'}} 
            onClick={() => navigate(`/admin/edit/${car.id}`)} 
          />
          <img 
            src={delete2} 
            alt="Delete" 
            style={{cursor: 'pointer'}} 
            onClick={() => handleDelete(car.id, car.name_en)} 
          />
        </td>
      </tr>
    ))
  )}
</tbody>




            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehiclesManage;