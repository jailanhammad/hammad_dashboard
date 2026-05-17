import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './reviewsmanager.css';

const ReviewsManager = () => {
    const [reviews, setReviews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const [formData, setFormData] = useState({
        key: 'rev_dynamic',
        en_name: '',
        ar_name: '',
        en_text: '',
        ar_text: '',
        rating: 5,
        image_url: '',
        display_order: 0
    });

    const fetchReviews = async () => {
        const { data, error } = await supabase
            .from('reviews_v2')
            .select('*')
            .order('display_order', { ascending: true });
        
        if (!error && data) setReviews(data);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            const { error } = await supabase
                .from('reviews_v2')
                .update({
                    key: formData.key,
                    en_name: formData.en_name,
                    ar_name: formData.ar_name,
                    en_text: formData.en_text,
                    ar_text: formData.ar_text,
                    rating: parseInt(formData.rating),
                    image_url: formData.image_url,
                    display_order: parseInt(formData.display_order)
                })
                .eq('id', editingId);
            
            if (!error) {
                setEditingId(null);
                alert('Saved and updated successfully!');
            }
        } else {
            const { error } = await supabase
                .from('reviews_v2')
                .insert([{
                    key: formData.key,
                    en_name: formData.en_name,
                    ar_name: formData.ar_name,
                    en_text: formData.en_text,
                    ar_text: formData.ar_text,
                    rating: parseInt(formData.rating),
                    image_url: formData.image_url,
                    display_order: parseInt(formData.display_order)
                }]);
            
            if (!error) alert('Record submitted successfully!');
        }

        setFormData({ key: 'rev_dynamic', en_name: '', ar_name: '', en_text: '', ar_text: '', rating: 5, image_url: '', display_order: 0 });
        fetchReviews();
    };

    const handleEdit = (rev) => {
        setEditingId(rev.id);
        setFormData({
            key: rev.key || 'rev_dynamic',
            en_name: rev.en_name || '',
            ar_name: rev.ar_name || '',
            en_text: rev.en_text || '',
            ar_text: rev.ar_text || '',
            rating: rev.rating || 5,
            image_url: rev.image_url || '',
            display_order: rev.display_order || 0
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this content item?')) {
            const { error } = await supabase
                .from('reviews_v2')
                .delete()
                .eq('id', id);
            
            if (!error) fetchReviews();
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>8. Reviews & Translations Manager</h2>
                <p>Dynamically control testimonial cards, section main headers, and button texts from database.</p>
            </div>
            
            <form className="manager-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>DATA KEY / CLASSIFICATION</label>
                        <select name="key" value={formData.key} onChange={handleChange}>
                            <option value="rev_dynamic">New Testimonial Card</option>
                            <option value="header">Modify Section Header Titles</option>
                            <option value="ui">Modify "View All" Button Label</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>RATING STARS (1-5)</label>
                        <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>NAME / CONTEXT LABEL (EN)</label>
                        <input type="text" name="en_name" value={formData.en_name} onChange={handleChange} required placeholder="Input English string..." />
                    </div>
                    <div className="form-group">
                        <label>الاسم / العنونة السياقية (عربي)</label>
                        <input type="text" name="ar_name" value={formData.ar_name} onChange={handleChange} required placeholder="أدخل النص العربي..." />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>COMMENT / TEXT BODY (EN)</label>
                        <input type="text" name="en_text" value={formData.en_text} onChange={handleChange} placeholder="Input full English text..." />
                    </div>
                    <div className="form-group">
                        <label>التعليق / متن النص الجسدي (عربي)</label>
                        <input type="text" name="ar_text" value={formData.ar_text} onChange={handleChange} placeholder="أدخل النص العربي الكامل..." />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>AVATAR SOURCE (IMAGE URL)</label>
                        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." />
                    </div>
                    <div className="form-group">
                        <label>DISPLAY SEQUENCE ORDER</label>
                        <input type="number" name="display_order" value={formData.display_order} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        {editingId ? "Update Item" : "Submit Data Item"}
                    </button>
                    {editingId && (
                        <button type="button" className="back-btn" onClick={() => {
                            setEditingId(null);
                            setFormData({ key: 'rev_dynamic', en_name: '', ar_name: '', en_text: '', ar_text: '', rating: 5, image_url: '', display_order: 0 });
                        }}>Cancel</button>
                    )}
                </div>
            </form>

            <div className="inventory-section">
                <h3>Active Content Records ({reviews.length})</h3>
                <div className="table-responsive">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>CLASSIFICATION</th>
                                <th>ENGLISH PREVIEW</th>
                                <th>ARABIC PREVIEW</th>
                                <th>STARS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((rev) => (
                                <tr key={rev.id}>
                                    <td style={{ fontWeight: '700', color: rev.key.startsWith('rev') ? '#388e3c' : '#d32f2f', fontSize: '11px', letterSpacing: '0.5px' }}>
                                        {rev.key.toUpperCase()}
                                    </td>
                                    <td style={{ fontSize: '13px', color: '#fff' }}>
                                        <div style={{ fontWeight: '600' }}>{rev.en_name}</div>
                                        <div style={{ color: '#777', marginTop: '4px', fontSize: '12px' }}>{rev.en_text}</div>
                                    </td>
                                    <td style={{ fontSize: '13px', color: '#fff', textAlign: 'right' }} dir="rtl">
                                        <div style={{ fontWeight: '600' }}>{rev.ar_name}</div>
                                        <div style={{ color: '#777', marginTop: '4px', fontSize: '12px' }}>{rev.ar_text}</div>
                                    </td>
                                    <td style={{ color: '#fbc02d' }}>{"★".repeat(rev.rating || 5)}</td>
                                    <td className="actions-cell">
                                        <button className="icon-edit-btn" onClick={() => handleEdit(rev)} title="Edit Row">✏️</button>
                                        <button className="icon-delete-btn" onClick={() => handleDelete(rev.id)} title="Delete Row">🗑️</button>
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

export default ReviewsManager;