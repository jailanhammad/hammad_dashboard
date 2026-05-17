import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './browsemanager.css';

const BrowseManager = () => {
    const [types, setTypes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const [formData, setFormData] = useState({
        name_en: '',
        name_ar: '',
        car_count: 0,
        image_url: ''
    });

    const fetchTypes = async () => {
        const { data, error } = await supabase
            .from('browse_types')
            .select('*')
            .order('id', { ascending: true });
        
        if (!error && data) setTypes(data);
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            const { error } = await supabase
                .from('browse_types')
                .update(formData)
                .eq('id', editingId);
            
            if (!error) {
                setEditingId(null);
                alert('Changes saved successfully!');
            }
        } else {
            const { error } = await supabase
                .from('browse_types')
                .insert([formData]);
            
            if (!error) alert('Type added successfully!');
        }

        setFormData({ name_en: '', name_ar: '', car_count: 0, image_url: '' });
        fetchTypes();
    };

    const handleEdit = (type) => {
        setEditingId(type.id);
        setFormData({
            name_en: type.name_en,
            name_ar: type.name_ar,
            car_count: type.car_count,
            image_url: type.image_url
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            const { error } = await supabase
                .from('browse_types')
                .delete()
                .eq('id', id);
            
            if (!error) fetchTypes();
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>5. Browse by Type</h2>
                <p>Manage categories and stock statistics shown on the home page.</p>
            </div>
            
            <form className="manager-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>TYPE NAME (EN)</label>
                        <input type="text" name="name_en" value={formData.name_en} onChange={handleChange} required placeholder="e.g. Sedan, SUV" />
                    </div>
                    <div className="form-group">
                        <label>الاسم (عربي)</label>
                        <input type="text" name="name_ar" value={formData.name_ar} onChange={handleChange} required placeholder="مثال: سيدان، دفع رباعي" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>CAR COUNT (ENTER 0 FOR COMING SOON)</label>
                        <input type="number" name="car_count" value={formData.car_count} onChange={handleChange} required min="0" />
                    </div>
                    <div className="form-group">
                        <label>IMAGE URL</label>
                        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required placeholder="https://example.com/suv-bg.jpg" />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        {editingId ? "Save Changes" : "Add New Type"}
                    </button>
                    {editingId && (
                        <button type="button" className="back-btn" onClick={() => {
                            setEditingId(null);
                            setFormData({ name_en: '', name_ar: '', car_count: 0, image_url: '' });
                        }}>Cancel</button>
                    )}
                </div>
            </form>

            <div className="inventory-section">
                <h3>Active Vehicle Types ({types.length})</h3>
                <div className="table-responsive">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>CATEGORY</th>
                                <th>AVAILABILITY / COUNT</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {types.map((type) => (
                                <tr key={type.id}>
                                    <td className="vehicle-cell">
                                        <img src={type.image_url} alt="type" className="cell-img" />
                                        <div className="vehicle-info">
                                            <span className="car-title">{type.name_en}</span>
                                            <span className="car-id">{type.name_ar}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {Number(type.car_count) === 0 ? (
                                            <span className="status-badge coming-soon">Coming Soon</span>
                                        ) : (
                                            <span className="status-badge available">{type.car_count} Cars</span>
                                        )}
                                    </td>
                                    <td className="actions-cell">
                                        <button className="icon-edit-btn" onClick={() => handleEdit(type)} title="Edit">✏️</button>
                                        <button className="icon-delete-btn" onClick={() => handleDelete(type.id)} title="Delete">🗑️</button>
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

export default BrowseManager;