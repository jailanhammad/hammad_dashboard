import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import './vehiclesmanage.css'; 


const VehicleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [vehicle, setVehicle] = useState({});

    useEffect(() => {
        const fetchVehicle = async () => {
            const { data } = await supabase.from('vehiclescards').select('*').eq('id', id).single();
            if (data) setVehicle(data);
            setLoading(false);
        };
        fetchVehicle();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const { error } = await supabase
            .from('vehiclescards')
            .update({
                name_en: vehicle.name_en,
                price: parseInt(vehicle.price), 
                is_instock: vehicle.is_instock,
                category: vehicle.category
            })
            .eq('id', id);
    
        if (error) {
            alert("Update Failed: " + error.message);
        } else {
            alert("Vehicle Updated!");
            navigate('/vehicles'); 
        }
    };

    if (loading) return <div className="hm-admin-layout"><h1 style={{color: 'white'}}>Loading...</h1></div>;

    return (
<>
<div className="hm-edit-container">
  <div className="hm-edit-header">
    <div className="header-text">
      <h1>Edit: {vehicle.name_en}</h1>
      <p>Modify the details for this unit in the Hammad Motors collection.</p>
    </div>
    <button className="hm-back-btn" onClick={() => navigate(-1)}>Back to Fleet</button>
  </div>

  <div className="hm-chic-card">
    <form onSubmit={handleUpdate} className="hm-chic-form">
      
      <div className="form-row">
        <div className="input-field">
          <label>Vehicle Name (EN)</label>
          <input 
            type="text" 
            value={vehicle.name_en || ''} 
            onChange={e => setVehicle({...vehicle, name_en: e.target.value})} 
          />
        </div>
        <div className="input-field">
          <label>الاسم (عربي)</label>
          <input 
            type="text" 
            className="text-right"
            value={vehicle.name_ar || ''} 
            onChange={e => setVehicle({...vehicle, name_ar: e.target.value})} 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-field">
          <label>Price (EGP)</label>
          <input 
            type="number" 
            value={vehicle.price || ''} 
            onChange={e => setVehicle({...vehicle, price: e.target.value})} 
          />
        </div>
        <div className="input-field">
          <label>Mileage (KM)</label>
          <input 
            type="number" 
            value={vehicle.mileage || ''} 
            onChange={e => setVehicle({...vehicle, mileage: e.target.value})} 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-field">
          <label>Year</label>
          <input 
            type="number" 
            value={vehicle.year || ''} 
            onChange={e => setVehicle({...vehicle, year: e.target.value})} 
          />
        </div>
        <div className="input-field">
          <label>Category</label>
          <select 
            value={vehicle.category || ''} 
            onChange={e => setVehicle({...vehicle, category: e.target.value})}
          >
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Sport">Sport</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="input-field">
          <label>Inventory Status</label>
          <select 
            value={vehicle.is_instock ? 'true' : 'false'} 
            onChange={e => setVehicle({...vehicle, is_instock: e.target.value === 'true'})}
          >
            <option value="true">Available</option>
            <option value="false">Sold Out</option>
          </select>
        </div>
        <div className="input-field">
          <label>Image URL</label>
          <input 
            type="text" 
            value={vehicle.thumbnail_url || ''} 
            onChange={e => setVehicle({...vehicle, thumbnail_url: e.target.value})} 
          />
        </div>
      </div>

      <button type="submit" className="hm-gradient-btn">
        <span>Save Changes</span>
      </button>
    </form>
  </div>
</div>
        </>

    );
};

export default VehicleEdit;