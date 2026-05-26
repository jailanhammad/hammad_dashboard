import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import './webmanagement.css';
import NavManager from './navmanager';
import FooterManager from './footermanager';
import WhyUsManager from './whyusmanager';
import ReviewsManager from './reviewsmanager';
import { Link, useLocation } from 'react-router-dom';

const RecommendedWebPage = () => {

    const [lang, setLang] = useState('en'); 
    const location = useLocation(); 
    const isActive = (path) => location.pathname === path;
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [form, setForm] = useState({
        name: '', price: '', category: 'Sedan', state: 'Used', image_url: ''
    });

    const fetchCars = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('recommended_cars').select('*').order('id', { ascending: false });
        if (data) setCars(data);
        if (error) console.error(error);
        setLoading(false);
    }, []);

    useEffect(() => { fetchCars(); }, [fetchCars]);

    const handleSave = async () => {
        if (!form.name || !form.price || !form.image_url) return alert("Please fill required fields!");

        setLoading(true);
        try {
            if (isEditing) {
                const { error } = await supabase.from('recommended_cars').update(form).eq('id', currentId);
                if (!error) alert("Car Updated! ");
            } else {
                const { error } = await supabase.from('recommended_cars').insert([form]);
                if (!error) alert("Car Added to Recommendations! ");
            }
            resetForm();
            fetchCars();
        } catch (err) { alert(err.message); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this vehicle?")) {
            await supabase.from('recommended_cars').delete().eq('id', id);
            fetchCars();
        }
    };

    const resetForm = () => {
        setForm({ name: '', price: '', category: 'Sedan', state: 'Used', image_url: '' });
        setIsEditing(false);
        setCurrentId(null);
    };

    const startEdit = (car) => {
        setIsEditing(true);
        setCurrentId(car.id);
        setForm({ name: car.name, price: car.price, category: car.category, state: car.state, image_url: car.image_url });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="admin-dashboard-wrapper">

<div className="admin-header-box">

                <div>
                    <h1 className="admin-main-title">Website Content Management</h1>
                    <p className="admin-sub-text">Manage all website content in English and Arabic</p>
                </div>
                <div className="admin-tabs-list" style={{ marginBottom: '10px' }}>
                    <button onClick={() => setLang('en')} className={`admin-tab-item ${lang === 'en' ? 'is-active' : ''}`}>EN</button>
                    <button onClick={() => setLang('ar')} className={`admin-tab-item ${lang === 'ar' ? 'is-active' : ''}`}>AR</button>
                </div>
            </div>

            <div className="admin-tabs-list">
                <Link to="/website"><button className={`admin-tab-item ${isActive('/website') ? 'is-active' : ''}`}>Home Page</button></Link>
                <Link to="/aboutwebsite"><button className={`admin-tab-item ${isActive('/aboutwebsite') ? 'is-active' : ''}`}>About Us</button></Link>
                <Link to="/contactwebsite"><button className={`admin-tab-item ${isActive('/contactwebsite') ? 'is-active' : ''}`}>Contact</button></Link>
                <Link to="/soldwebsite"><button className={`admin-tab-item ${isActive('/soldwebsite') ? 'is-active' : ''}`}>Most Sold</button></Link>
                <Link to="/serviceswebsite"><button className={`admin-tab-item ${isActive('/serviceswebsite') ? 'is-active' : ''}`}>Services</button></Link>
                <Link to="/installmentswebsite"><button className={`admin-tab-item ${isActive('/installmentswebsite') ? 'is-active' : ''}`}>Installments</button></Link>
                <Link to="/soonwebsite"><button className={`admin-tab-item ${isActive('/soonwebsite') ? 'is-active' : ''}`}>Coming Soon</button></Link>
                <Link to="/recommended"><button className={`admin-tab-item ${isActive('/recommended') ? 'is-active' : ''}`}>Recommended</button></Link>

                {/* <button className="admin-tab-add-btn">Add Page +</button> */}
            </div>

            <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#aaa', margin: 0 }}>Recommended Page Content Management</p>
            </div>
            <NavManager />

            <div className="admin-header-box">
                <h1 className="admin-main-title">Recommended Vehicles Manager</h1>
                {/* <p className="admin-sub-text">Control the premium selection grid on the homepage</p> */}
            </div>

            <div className="contact-content-box" style={{ marginTop: '20px' }}>
                <h3 className="contact-box-title">{isEditing ? 'Edit Vehicle Details' : 'Add New Recommended Vehicle'}</h3>
                <div className="contact-cards-section">
                    <div className="admin-form-split-grid">
                        <div className="input-group">
                            <label className="input-label-sub">Vehicle Name</label>
                            <input type="text" className="contact-text-input" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="e.g. Mercedes S450" />
                        </div>
                        <div className="input-group">
                            <label className="input-label-sub">Price (EGP)</label>
                            <input type="text" className="contact-text-input" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="e.g. 6,000,000" />
                        </div>
                    </div>

                    <div className="admin-form-split-grid" style={{marginTop: '15px'}}>
                        <div className="input-group">
                            <label className="input-label-sub">Category</label>
                            <select className="contact-text-input" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Luxury">Luxury</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label-sub">Condition</label>
                            <select className="contact-text-input" value={form.state} onChange={(e) => setForm({...form, state: e.target.value})}>
                                <option value="Used">Used</option>
                                <option value="New">New</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group" style={{marginTop: '15px'}}>
                        <label className="input-label-sub">Image URL</label>
                        <input type="text" className="contact-text-input" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} placeholder="Paste image link here" />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button onClick={handleSave} className="btn-save-contact" style={{ background: '#e31b23', width: 'auto', padding: '10px 30px' }}>
                            {isEditing ? 'Update Vehicle' : 'Add to Inventory'}
                        </button>
                        {isEditing && <button onClick={resetForm} className="btn-save-contact" style={{ background: '#333', width: 'auto' }}>Cancel</button>}
                    </div>
                </div>
            </div>

            <div className="admin-table-responsive-wrapper" style={{ marginTop: '40px' }}>
                <table className="admin-premium-data-table" style={{ width: '100%', background: '#111', color: '#fff' }}>
                    <thead>
                        <tr style={{ background: '#1c1c1e' }}>
                            <th style={{ padding: '15px' }}>Preview</th>
                            <th style={{ padding: '15px' }}>Name</th>
                            <th style={{ padding: '15px' }}>Price</th>
                            <th style={{ padding: '15px' }}>Category</th>
                            <th style={{ padding: '15px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id} style={{ borderBottom: '1px solid #222' }}>
                                <td style={{ padding: '10px' }}><img src={car.image_url} alt="" style={{ width: '60px', height: '40px', objectFit: 'contain' }} /></td>
                                <td style={{ padding: '10px' }}>{car.name}</td>
                                <td style={{ padding: '10px', color: '#e31b23' }}>{car.price}</td>
                                <td style={{ padding: '10px' }}>{car.category}</td>
                                {/* <td style={{ padding: '10px' }}>
                                    <button onClick={() => startEdit(car)} className="notify-btn" style={{ fontSize: '11px', padding: '5px 10px', marginRight: '5px' }}>Edit</button>
                                    <button onClick={() => handleDelete(car.id)} className="notify-btn" style={{ fontSize: '11px', padding: '5px 10px', background: '#441111' }}>Delete</button>
                                </td> */}

<td className="actions-cell">
    <div className="actions-wrapper">
        <button 
            onClick={() => startEdit(car)} 
            className="admin-action-btn btn-edit-mode"
        >
            Edit
        </button>
        
        <button 
            onClick={() => handleDelete(car.id)} 
            className="admin-action-btn btn-delete-mode"
        >
            Delete
        </button>
    </div>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <WhyUsManager />
            <ReviewsManager />
            <FooterManager />
        </div>
    );
};

export default RecommendedWebPage;