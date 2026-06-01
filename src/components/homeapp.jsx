import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; 
import './homeapp.css'; 
import ExploreManager from './exploreapp';
import MostSoldManager from './mostsoldapp';
import ReviewManager from './reviewapp';

const HomeApp = ({ lang = 'en' }) => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    badge_text_en: '',
    car_title_en: '',
    price_en: '',
    badge_text_ar: '',
    car_title_ar: '',
    price_ar: '',
    image_url: ''
  });

  const fetchCars = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('featured_cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cars:', error);
    } else {
      setCars(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isEditing) {
      const { error } = await supabase
        .from('featured_cars')
        .update(formData)
        .eq('id', editId);

      if (!error) {
        setIsEditing(false);
        setEditId(null);
      }
    } else {
      const { error } = await supabase
        .from('featured_cars')
        .insert([formData]);
        
      if (error) console.error('Error adding car:', error);
    }

    setFormData({
      badge_text_en: '', car_title_en: '', price_en: '',
      badge_text_ar: '', car_title_ar: '', price_ar: '', image_url: ''
    });
    fetchCars();
  };

  const handleEdit = (car) => {
    setIsEditing(true);
    setEditId(car.id);
    setFormData({
      badge_text_en: car.badge_text_en,
      car_title_en: car.car_title_en,
      price_en: car.price_en,
      badge_text_ar: car.badge_text_ar,
      car_title_ar: car.car_title_ar,
      price_ar: car.price_ar,
      image_url: car.image_url
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this featured car?');
    if (!confirmDelete) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('featured_cars')
      .delete()
      .eq('id', id);

    if (error) console.error('Error deleting car:', error);
    fetchCars();
  };

  return (
    <div className="hm-admin-featured-wrapper">
      <div className="hm-admin-header">
        <h2 className="hm-admin-title">Manage Featured Cars</h2>
      </div>

      <form className="hm-admin-form" onSubmit={handleSubmit}>
        <div className="hm-admin-form-grid">
          
          {lang === 'en' && (
            <>
              <div className="hm-admin-input-group">
                <label>Badge Text (EN)</label>
                <input type="text" name="badge_text_en" value={formData.badge_text_en} onChange={handleChange} placeholder="e.g. FEATURED" />
              </div>
              <div className="hm-admin-input-group">
                <label>Car Title (EN)</label>
                <input type="text" name="car_title_en" value={formData.car_title_en} onChange={handleChange} placeholder="e.g. Mercedes C180 2023" />
              </div>
              <div className="hm-admin-input-group">
                <label>Price (EN)</label>
                <input type="text" name="price_en" value={formData.price_en} onChange={handleChange} placeholder="e.g. 2,800,000" />
              </div>
            </>
          )}

          {lang === 'ar' && (
            <>
              <div className="hm-admin-input-group">
                <label>Badge Text (AR)</label>
                <input type="text" name="badge_text_ar" value={formData.badge_text_ar} onChange={handleChange} placeholder="مثال: مميز" dir="rtl" />
              </div>
              <div className="hm-admin-input-group">
                <label>Car Title (AR)</label>
                <input type="text" name="car_title_ar" value={formData.car_title_ar} onChange={handleChange} placeholder="مثال: مرسيدس C180" dir="rtl" />
              </div>
              <div className="hm-admin-input-group">
                <label>Price (AR)</label>
                <input type="text" name="price_ar" value={formData.price_ar} onChange={handleChange} placeholder="مثال: ٢,٨٠٠,٠٠٠" dir="rtl" />
              </div>
            </>
          )}

          <div className="hm-admin-input-group hm-admin-full-width">
            <label>Image URL</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required placeholder="Paste image link here..." />
          </div>
        </div>

        <button type="submit" className="hm-admin-submit-btn" disabled={isLoading}>
          {isLoading ? 'Processing...' : (isEditing ? 'Update Featured Car' : 'Add Featured Car')}
        </button>
        {isEditing && (
          <button type="button" className="hm-admin-cancel-btn" onClick={() => { setIsEditing(false); setFormData({badge_text_en: '', car_title_en: '', price_en: '', badge_text_ar: '', car_title_ar: '', price_ar: '', image_url: ''}); setEditId(null); }}>
            Cancel
          </button>
        )}
      </form>

      <hr className="hm-admin-divider" />

      <div className="hm-admin-table-container">
        <table className="hm-admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title (EN / AR)</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>
                  <img src={car.image_url} alt={car.car_title_en} className="hm-admin-thumbnail" />
                </td>
                <td>
                  <strong>{car.car_title_en}</strong>
                  <br />
                  <span className="hm-admin-ar-text" dir="rtl">{car.car_title_ar}</span>
                </td>
                <td>{lang === 'en' ? car.price_en : car.price_ar}</td>
                <td className="hm-admin-actions">
                  <button className="hm-admin-edit-btn" onClick={() => handleEdit(car)}>Edit</button>
                  <button className="hm-admin-delete-btn" onClick={() => handleDelete(car.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {cars.length === 0 && !isLoading && (
              <tr>
                <td colSpan="4" className="hm-admin-empty">No featured cars found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      

    <ExploreManager lang={lang} />
    <MostSoldManager lang={lang} />
    <ReviewManager lang={lang}  />

    </div>
  );
};

export default HomeApp;