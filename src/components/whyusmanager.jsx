import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; 
import './whyusmanager.css';

const WhyUsManager = () => {
    const [features, setFeatures] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const [formData, setFormData] = useState({
        feature_key: 'quality',
        title_en: '',
        title_ar: '',
        desc_en: '',
        desc_ar: '',
        display_order: 0
    });

    const fetchFeatures = async () => {
        const { data, error } = await supabase
            .from('why_us_features')
            .select('*')
            .order('display_order', { ascending: true });
        
        if (!error && data) setFeatures(data);
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            const { error } = await supabase
                .from('why_us_features')
                .update(formData)
                .eq('id', editingId);
            
            if (!error) {
                setEditingId(null);
                alert('Changes saved successfully!');
            }
        } else {
            const { error } = await supabase
                .from('why_us_features')
                .insert([formData]);
            
            if (!error) alert('Feature card added successfully!');
        }

        setFormData({ feature_key: 'quality', title_en: '', title_ar: '', desc_en: '', desc_ar: '', display_order: 0 });
        fetchFeatures();
    };

    const handleEdit = (feature) => {
        setEditingId(feature.id);
        setFormData({
            feature_key: feature.feature_key,
            title_en: feature.title_en,
            title_ar: feature.title_ar,
            desc_en: feature.desc_en,
            desc_ar: feature.desc_ar,
            display_order: feature.display_order
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this feature card?')) {
            const { error } = await supabase
                .from('why_us_features')
                .delete()
                .eq('id', id);
            
            if (!error) fetchFeatures();
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>7. Why Choose Us Section</h2>
                <p>Configure the marketing feature blocks and icons displayed under the showroom info.</p>
            </div>
            
            <form className="manager-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>CARD ICON / KEY</label>
                        <select name="feature_key" value={formData.feature_key} onChange={handleChange}>
                            <option value="quality">Premium Quality (Shield Icon)</option>
                            <option value="financing">Best Financing (Ribbon Icon)</option>
                            <option value="support">Global Support (Map Pin Icon)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>DISPLAY ORDER</label>
                        <input type="number" name="display_order" value={formData.display_order} onChange={handleChange} required min="0" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>CARD TITLE (EN)</label>
                        <input type="text" name="title_en" value={formData.title_en} onChange={handleChange} required placeholder="e.g. Premium Quality" />
                    </div>
                    <div className="form-group">
                        <label>العنوان (عربي)</label>
                        <input type="text" name="title_ar" value={formData.title_ar} onChange={handleChange} required placeholder="مثال: جودة ممتازة" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>DESCRIPTION (EN)</label>
                        <input type="text" name="desc_en" value={formData.desc_en} onChange={handleChange} required placeholder="e.g. Every vehicle undergoes a rigorous inspection..." />
                    </div>
                    <div className="form-group">
                        <label>الوصف (عربي)</label>
                        <input type="text" name="desc_ar" value={formData.desc_ar} onChange={handleChange} required placeholder="مثال: تخضع كل سيارة لفحص دقيق..." />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        {editingId ? "Save Changes" : "Add Feature Card"}
                    </button>
                    {editingId && (
                        <button type="button" className="back-btn" onClick={() => {
                            setEditingId(null);
                            setFormData({ feature_key: 'quality', title_en: '', title_ar: '', desc_en: '', desc_ar: '', display_order: 0 });
                        }}>Cancel</button>
                    )}
                </div>
            </form>

            <div className="inventory-section">
                <h3>Active Features ({features.length})</h3>
                <div className="table-responsive">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>ICON / KEY</th>
                                <th>TITLE (EN)</th>
                                <th>ORDER</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feat) => (
                                <tr key={feat.id}>
                                    <td style={{ textTransform: 'uppercase', fontWeight: '600', color: '#e31b23', fontSize: '12px' }}>
                                        {feat.feature_key}
                                    </td>
                                    <td>
                                        <div className="vehicle-info">
                                            <span className="car-title">{feat.title_en}</span>
                                            <span className="car-id">{feat.title_ar}</span>
                                        </div>
                                    </td>
                                    <td>{feat.display_order}</td>
                                    <td className="actions-cell">
                                        <button className="icon-edit-btn" onClick={() => handleEdit(feat)} title="Edit">✏️</button>
                                        <button className="icon-delete-btn" onClick={() => handleDelete(feat.id)} title="Delete">🗑️</button>
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

export default WhyUsManager;