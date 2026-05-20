import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; 
import './webmanagement.css'; 
import ReviewsManager from './reviewsmanager';
import FooterManager from './footermanager';
import NavManager from './navmanager';
import WhyUsManager from './whyusmanager';

import { Link, useLocation } from 'react-router-dom';

const SoldWebPage = () => {

    const location = useLocation(); 
    const isActive = (path) => location.pathname === path;
    const [loading, setLoading] = useState(false);
    const [cars, setCars] = useState([]);

    const [lang, setLang] = useState('en'); 
    
    const [newCar, setNewCar] = useState({ name: '', price: '', sold_count: '', rating: '', image_url: '' });
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchMostSoldCars = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('best_sellers') 
            .select('*')
            .order('id', { ascending: true });

        if (data) {
            setCars(data);
        }
        if (error) console.error('Error fetching best sellers:', error);
        setLoading(false);
    };

    useEffect(() => {
        fetchMostSoldCars();
    }, []);

    const handleInputChange = (id, field, value) => {
        setCars(prevCars =>
            prevCars.map(car => (car.id === id ? { ...car, [field]: value } : car))
        );
    };

    const handleSaveCarChanges = async (carId) => {
        const carToUpdate = cars.find(c => c.id === carId);
        if (!carToUpdate) return;

        setLoading(true);
        const { error } = await supabase
            .from('best_sellers')
            .update({
                name: carToUpdate.name,
                price: carToUpdate.price,
                sold_count: carToUpdate.sold_count,
                rating: carToUpdate.rating,
                image_url: carToUpdate.image_url 
            })
            .eq('id', carId);

        if (!error) {
            alert(`Car "${carToUpdate.name}" Updated Successfully! `);
            fetchMostSoldCars(); 
        } else {
            console.error('Update error:', error);
            alert('Failed to update car data.');
        }
        setLoading(false);
    };

    const handleDeleteCar = async (carId, carName) => {
        if (!window.confirm(`Are you sure you want to delete "${carName}"? `)) return;

        setLoading(true);
        const { error } = await supabase
            .from('best_sellers')
            .delete()
            .eq('id', carId);

        if (!error) {
            alert(`Car "${carName}" Deleted Successfully! `);
            fetchMostSoldCars(); 
        } else {
            console.error('Delete error:', error);
            alert('Failed to delete car.');
        }
        setLoading(false);
    };

    const handleAddCar = async (e) => {
        e.preventDefault();
        if (!newCar.name || !newCar.price) {
            alert('Please enter at least Car Name and Price!');
            return;
        }

        setLoading(true);
        const { error } = await supabase
            .from('best_sellers')
            .insert([
                {
                    name: newCar.name,
                    price: newCar.price,
                    sold_count: newCar.sold_count || '0 Units Sold',
                    rating: parseFloat(newCar.rating) || 5,
                    image_url: newCar.image_url 
                }
            ]);

        if (!error) {
            alert('New Car Added Successfully! 🎉');
            setNewCar({ name: '', price: '', sold_count: '', rating: '', image_url: '' }); 
            setShowAddForm(false); 
            fetchMostSoldCars(); 
        } else {
            console.error('Insert error:', error);
            alert('Failed to add new car.');
        }
        setLoading(false);
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

                {/* <button className="admin-tab-add-btn">Add Page +</button> */}
            </div>

            <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#aaa', margin: 0 }}>Most Sold Page Content Management</p>
            </div>

            <NavManager />

            <div className="contact-content-box">
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 className="contact-box-title" style={{ margin: 0 }}>Manage Most Sold Cars</h3>
                    <button 
                        onClick={() => setShowAddForm(!showAddForm)} 
                        className="btn-save-contact"
                        style={{ background: showAddForm ? '#555' : '#e50914', width: 'auto', padding: '8px 15px', margin: 0 }}
                    >
                        {showAddForm ? 'Cancel Add' : '+ Add New Car'}
                    </button>
                </div>

                {showAddForm && (
                    <form onSubmit={handleAddCar} className="contact-cards-section" style={{ border: '1px solid #e50914', marginBottom: '25px', padding: '20px', borderRadius: '6px' }}>
                        <h4 style={{ color: '#e50914', marginTop: 0, marginBottom: '15px' }}>Add New Best Seller Car</h4>
                        <div className="grid-three-columns">
                            <div className="input-group">
                                <label className="input-label-sub">Car Name</label>
                                <input 
                                    type="text" 
                                    className="contact-text-input" 
                                    placeholder="e.g. Hyundai Verna"
                                    value={newCar.name} 
                                    onChange={(e) => setNewCar({...newCar, name: e.target.value})} 
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label-sub">Price (EGP)</label>
                                <input 
                                    type="text" 
                                    className="contact-text-input" 
                                    placeholder="e.g. 350,000"
                                    value={newCar.price} 
                                    onChange={(e) => setNewCar({...newCar, price: e.target.value})} 
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label-sub">Rating</label>
                                <input 
                                    type="number" 
                                    step="0.1"
                                    className="contact-text-input" 
                                    placeholder="e.g. 4.5"
                                    value={newCar.rating} 
                                    onChange={(e) => setNewCar({...newCar, rating: e.target.value})} 
                                />
                            </div>
                        </div>
                        
                        <div className="grid-two-columns" style={{ marginTop: '15px' }}>
                            <div className="input-group">
                                <label className="input-label-sub">Units Sold Text</label>
                                <input 
                                    type="text" 
                                    className="contact-text-input" 
                                    placeholder="e.g. 20 Units Sold"
                                    value={newCar.sold_count} 
                                    onChange={(e) => setNewCar({...newCar, sold_count: e.target.value})} 
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label-sub">Image URL (رابط صورة السيارة)</label>
                                <input 
                                    type="text" 
                                    className="contact-text-input" 
                                    placeholder="Paste image link here"
                                    value={newCar.image_url} 
                                    onChange={(e) => setNewCar({...newCar, image_url: e.target.value})} 
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button type="submit" className="btn-save-contact" style={{ margin: 0, width: '200px' }} disabled={loading}>
                                Save & Push to Website
                            </button>
                        </div>
                    </form>
                )}

                {loading && cars.length === 0 ? (
                    <p className="contact-loading-text">Loading Cars Data...</p>
                ) : (
                    <div className="contact-form-wrapper">
                        {cars.map((car, index) => (
                            <div key={car.id} className="contact-cards-section" style={{ position: 'relative', marginTop: '15px' }}>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#e50914', fontWeight: 'bold', fontSize: '14px' }}>
                                        Rank #{index + 1} Best Seller (ID: {car.id})
                                    </span>
                                    <button 
                                        onClick={() => handleDeleteCar(car.id, car.name)}
                                        style={{ background: 'transparent', color: '#ff3333', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                                    >
                                        🗑️ Delete Car
                                    </button>
                                </div>
                                
                                <div className="grid-three-columns" style={{ marginTop: '15px' }}>
                                    <div className="input-group">
                                        <label className="input-label-sub">Car Name</label>
                                        <input 
                                            type="text" 
                                            className="contact-text-input" 
                                            value={car.name || ''} 
                                            onChange={(e) => handleInputChange(car.id, 'name', e.target.value)} 
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label-sub">Price (EGP)</label>
                                        <input 
                                            type="text" 
                                            className="contact-text-input" 
                                            value={car.price || ''} 
                                            onChange={(e) => handleInputChange(car.id, 'price', e.target.value)} 
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label-sub">Rating</label>
                                        <input 
                                            type="text" 
                                            className="contact-text-input" 
                                            value={car.rating || ''} 
                                            onChange={(e) => handleInputChange(car.id, 'rating', e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <div className="grid-two-columns" style={{ marginTop: '10px' }}>
                                    <div className="input-group">
                                        <label className="input-label-sub">Units Sold Text</label>
                                        <input 
                                            type="text" 
                                            className="contact-text-input" 
                                            value={car.sold_count || ''} 
                                            onChange={(e) => handleInputChange(car.id, 'sold_count', e.target.value)} 
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label-sub">Image URL</label>
                                        <input 
                                            type="text" 
                                            className="contact-text-input" 
                                            placeholder="No image url set"
                                            value={car.image_url || ''} 
                                            onChange={(e) => handleInputChange(car.id, 'image_url', e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                                    <button 
                                        onClick={() => handleSaveCarChanges(car.id)} 
                                        className="btn-save-contact"
                                        style={{ margin: 0, padding: '10px 20px', width: 'auto' }}
                                        disabled={loading}
                                    >
                                        Save Changes
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>

            <WhyUsManager />
            <ReviewsManager />
            <FooterManager />


        </div>
    );
};

export default SoldWebPage;