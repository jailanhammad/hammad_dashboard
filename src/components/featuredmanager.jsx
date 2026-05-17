import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; 
import './featuredmanager.css';

const FeaturedManager = () => {
    const [vehicles, setVehicles] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const [formData, setFormData] = useState({
        image: '',
        name_en: '',
        name_ar: '',
        category_en: '',
        km_en: '',
        transmission_en: 'Automatic',
        price_en: ''
    });

    const fetchVehicles = async () => {
        const { data, error } = await supabase
            .from('featured_vehicles')
            .select('*')
            .order('id', { ascending: false });
        
        if (!error && data) setVehicles(data);
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submittableData = {
            ...formData,
            category_ar: formData.category_en,
            km_ar: formData.km_en,
            price_ar: formData.price_en,
            transmission_ar: formData.transmission_en === 'Automatic' ? 'أوتوماتيك' : formData.transmission_en
        };

        if (editingId) {
            const { error } = await supabase
                .from('featured_vehicles')
                .update(submittableData)
                .eq('id', editingId);
            
            if (!error) {
                setEditingId(null);
                alert('Changes saved successfully!');
            }
        } else {
            const { error } = await supabase
                .from('featured_vehicles')
                .insert([submittableData]);
            
            if (!error) alert('Vehicle added successfully!');
        }

        setFormData({
            image: '', name_en: '', name_ar: '', category_en: '', km_en: '', transmission_en: 'Automatic', price_en: ''
        });
        fetchVehicles();
    };

    const handleEdit = (vehicle) => {
        setEditingId(vehicle.id);
        setFormData({
            image: vehicle.image,
            name_en: vehicle.name_en,
            name_ar: vehicle.name_ar,
            category_en: vehicle.category_en,
            km_en: vehicle.km_en,
            transmission_en: vehicle.transmission_en,
            price_en: vehicle.price_en
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            const { error } = await supabase
                .from('featured_vehicles')
                .delete()
                .eq('id', id);
            
            if (!error) {
                fetchVehicles();
            }
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>4. Featured Vehicles</h2>
                <p>Modify the details for this section in the Hammad Motors collection.</p>
            </div>
            
            {/* Form المصمم بنفس نظام السطور والحقول بتاعتك */}
            <form className="manager-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>VEHICLE NAME (EN)</label>
                        <input type="text" name="name_en" value={formData.name_en} onChange={handleChange} required placeholder="e.g. Mercedes C180" />
                    </div>
                    <div className="form-group">
                        <label>الاسم (عربي)</label>
                        <input type="text" name="name_ar" value={formData.name_ar} onChange={handleChange} required placeholder="مثال: مرسيدس سي ١٨٠" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>PRICE (EGP / LE)</label>
                        <input type="text" name="price_en" value={formData.price_en} onChange={handleChange} required placeholder="e.g. 2,800,000 LE" />
                    </div>
                    <div className="form-group">
                        <label>MILEAGE (KM)</label>
                        <input type="text" name="km_en" value={formData.km_en} onChange={handleChange} placeholder="e.g. 50,000 km" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>CATEGORY</label>
                        <input type="text" name="category_en" value={formData.category_en} onChange={handleChange} placeholder="e.g. Avantgarde Plus" />
                    </div>
                    <div className="form-group">
                        <label>TRANSMISSION</label>
                        <select name="transmission_en" value={formData.transmission_en} onChange={handleChange}>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                </div>

                <div className="form-row full-width">
                    <div className="form-group">
                        <label>IMAGE URL</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} required placeholder="https://supabase.com/dashboard/storage/..." />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        {editingId ? "Save Changes" : "Add Vehicle"}
                    </button>
                    {editingId && (
                        <button type="button" className="back-btn" onClick={() => {
                            setEditingId(null);
                            setFormData({ image: '', name_en: '', name_ar: '', category_en: '', km_en: '', transmission_en: 'Automatic', price_en: '' });
                        }}>Cancel</button>
                    )}
                </div>
            </form>

            <div className="inventory-section">
                <h3>Live Featured Vehicles ({vehicles.length})</h3>
                <div className="table-responsive">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>VEHICLE</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle) => (
                                <tr key={vehicle.id}>
                                    <td className="vehicle-cell">
                                        <img src={vehicle.image} alt="car" className="cell-img" />
                                        <div className="vehicle-info">
                                            <span className="car-title">{vehicle.name_en}</span>
                                            <span className="car-id">ID: #{vehicle.id}</span>
                                        </div>
                                    </td>
                                    <td>{vehicle.category_en || '—'}</td>
                                    <td className="price-cell">{vehicle.price_en}</td>
                                    <td className="actions-cell">
                                        <button className="icon-edit-btn" onClick={() => handleEdit(vehicle)} title="Edit">
                                            ✏️
                                        </button>
                                        <button className="icon-delete-btn" onClick={() => handleDelete(vehicle.id)} title="Delete">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FeaturedManager;