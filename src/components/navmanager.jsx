import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './reviewsmanager.css';

const NavManager = () => {
    const [navNodes, setNavNodes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const [formData, setFormData] = useState({
        key: '',
        en: '',
        ar: ''
    });

    const fetchNavRegistry = async () => {
        const { data, error } = await supabase
            .from('navbar_v2')
            .select('*')
            .order('key', { ascending: true });
        
        if (!error && data) setNavNodes(data);
    };

    useEffect(() => {
        fetchNavRegistry();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            const { error } = await supabase
                .from('navbar_v2')
                .update({
                    key: formData.key,
                    en: formData.en,
                    ar: formData.ar
                })
                .eq('id', editingId);
            
            if (!error) {
                setEditingId(null);
                alert('Navbar text link updated successfully!');
            }
        } else {
            const { error } = await supabase
                .from('navbar_v2')
                .insert([formData]);
            
            if (!error) alert('New navbar label created successfully!');
        }

        setFormData({ key: '', en: '', ar: '' });
        fetchNavRegistry();
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
        if (window.confirm('Are you sure you want to delete this nav link translation? Deleting core nodes may cause layout display fallbacks.')) {
            const { error } = await supabase
                .from('navbar_v2')
                .delete()
                .eq('id', id);
            
            if (!error) fetchNavRegistry();
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>Header Navigation & Top-Bar Manager</h2>
                <p>Configure translations dynamically for brand titles, active links, dropdown content labels, and contact numbers.</p>
            </div>
            
            <form className="manager-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>NAVIGATION KEY (UNIQUE SYSTEM IDENTIFIER)</label>
                        <input type="text" name="key" value={formData.key} onChange={handleChange} required placeholder="e.g. brand, home, phone, vehicles" disabled={editingId !== null} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>ENGLISH LINK TEXT / VALUE</label>
                        <input type="text" name="en" value={formData.en} onChange={handleChange} required placeholder="Input English display name..." />
                    </div>
                    <div className="form-group">
                        <label>النص المعروض باللغة العربية</label>
                        <input type="text" name="ar" value={formData.ar} onChange={handleChange} required placeholder="أدخل اسم العرض العربي..." style={{ textAlign: 'right' }} dir="rtl" />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        {editingId ? "Update Nav Link" : "Create New"}
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
                <h3>Global Navbar Links Registry ({navNodes.length} active labels)</h3>
                <div className="table-responsive">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>NAV LINK KEY</th>
                                <th>ENGLISH PREVIEW</th>
                                <th>ARABIC PREVIEW</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {navNodes.map((node) => (
                                <tr key={node.id}>
                                    <td style={{ fontWeight: '700', color: '#e31b23', fontSize: '12px', fontFamily: 'monospace' }}>
                                        {node.key}
                                    </td>
                                    <td style={{ fontSize: '13px', color: '#fff' }}>{node.en}</td>
                                    <td style={{ fontSize: '13px', color: '#fff', textAlign: 'right' }} dir="rtl">{node.ar}</td>
                                    <td className="actions-cell">
                                        <button className="icon-edit-btn" onClick={() => handleEdit(node)} title="Edit Link">✏️</button>
                                        <button className="icon-delete-btn" onClick={() => handleDelete(node.id)} title="Delete Link">🗑️</button>
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

export default NavManager;