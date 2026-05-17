import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './reviewsmanager.css'; 

const FooterManager = () => {
    const [footerData, setFooterData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const [formData, setFormData] = useState({
        key: '',
        en: '',
        ar: ''
    });

    const fetchFooter = async () => {
        const { data, error } = await supabase
            .from('footer_v2')
            .select('*')
            .order('key', { ascending: true });
        
        if (!error && data) setFooterData(data);
    };

    useEffect(() => {
        fetchFooter();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            const { error } = await supabase
                .from('footer_v2')
                .update({
                    key: formData.key,
                    en: formData.en,
                    ar: formData.ar
                })
                .eq('id', editingId);
            
            if (!error) {
                setEditingId(null);
                alert('Footer updated successfully!');
            }
        } else {
            const { error } = await supabase
                .from('footer_v2')
                .insert([formData]);
            
            if (!error) alert('New footer element added successfully!');
        }

        setFormData({ key: '', en: '', ar: '' });
        fetchFooter();
    };

    const handleEdit = (node) => {
        setEditingId(node.id);
        setFormData({
            key: node.key,
            en: node.en || '',
            ar: node.ar || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this translation key? This might break the footer UI if requested.')) {
            const { error } = await supabase
                .from('footer_v2')
                .delete()
                .eq('id', id);
            
            if (!error) fetchFooter();
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>9. Footer Content & Translation Nodes</h2>
                <p>Fully manage dynamic text nodes, descriptions, labels, and contacts rendering inside global layout footer.</p>
            </div>
            
            <form className="manager-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>NODE KEY (MUST BE UNIQUE)</label>
                        <input type="text" name="key" value={formData.key} onChange={handleChange} required placeholder="e.g. brand, col1Title, address" disabled={editingId !== null} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>ENGLISH VERSION VALUE</label>
                        <textarea name="en" value={formData.en} onChange={handleChange} required placeholder="Input English translation value..." rows={3} style={{ background: '#222', border: '1px solid #2d2d2d', borderRadius: '10px', padding: '12px', color: '#fff', width: '100%' }} />
                    </div>
                    <div className="form-group">
                        <label>الترجمة باللغة العربية</label>
                        <textarea name="ar" value={formData.ar} onChange={handleChange} required placeholder="أدخل القيمة المقابلة باللغة العربية..." rows={3} style={{ background: '#222', border: '1px solid #2d2d2d', borderRadius: '10px', padding: '12px', color: '#fff', width: '100%', textAlign: 'right' }} dir="rtl" />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        {editingId ? "Save Changes" : "Add New"}
                    </button>
                    {editingId && (
                        <button type="button" className="back-btn" onClick={() => {
                            setEditingId(null);
                            setFormData({ key: '', en: '', ar: '' });
                        }}>Cancel</button>
                    )}
                </div>
            </form>

            <div className="inventory-section">
                <h3>Global Footer Registry ({footerData.length} active nodes)</h3>
                <div className="table-responsive">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>DICTIONARY KEY</th>
                                <th>ENGLISH STRING</th>
                                <th>ARABIC STRING</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {footerData.map((node) => (
                                <tr key={node.id}>
                                    <td style={{ fontWeight: '700', color: '#e31b23', fontSize: '12px', fontFamily: 'monospace' }}>
                                        {node.key}
                                    </td>
                                    <td style={{ fontSize: '13px', color: '#fff' }}>{node.en}</td>
                                    <td style={{ fontSize: '13px', color: '#fff', textAlign: 'right' }} dir="rtl">{node.ar}</td>
                                    <td className="actions-cell">
                                        <button className="icon-edit-btn" onClick={() => handleEdit(node)} title="Edit Node">✏️</button>
                                        <button className="icon-delete-btn" onClick={() => handleDelete(node.id)} title="Delete Node">🗑️</button>
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

export default FooterManager;