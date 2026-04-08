import React, { useState, useEffect } from 'react';
import './webmanagement.css';
import { supabase } from '../supabase'; 

const WebManagement = () => {
    const [loading, setLoading] = useState(false);
    const [lang, setLang] = useState('en'); 
    const [content, setContent] = useState({
        hero_title_en: '',
        hero_title_ar: '',
        hero_desc_en: '',
        hero_desc_ar: '',
        cta_text_en: '',
        cta_text_ar: '',
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        const { data, error } = await supabase
            .from('website_content')
            .select('*')
            .single(); 

        if (data) setContent(data);
        if (error) console.error('Error fetching data:', error);
    };

    const handleSave = async () => {
        setLoading(true);
        const { error } = await supabase
            .from('website_content')
            .update(content)
            .eq('id', 1); 

        if (!error) {
            alert('Changes saved successfully! ✅');
        } else {
            alert('Error saving data! ❌');
        }
        setLoading(false);
    };

    return (
     
<div className="admin-dashboard-wrapper" dir="ltr">
            <div className="admin-header-box">
                <div>
                    <h1 className="admin-main-title">Website Content Management</h1>
                    <p className="admin-sub-text">Manage all website content in English and Arabic</p>
                </div>
                
                <div className="admin-tabs-list" style={{ marginBottom: '10px' }}>
                    <button 
                        onClick={() => setLang('en')}
                        className={`admin-tab-item ${lang === 'en' ? 'is-active' : ''}`}>EN</button>
                    <button 
                        onClick={() => setLang('ar')}
                        className={`admin-tab-item ${lang === 'ar' ? 'is-active' : ''}`}>AR</button>
                </div>
            </div>

            <div className="admin-tabs-list">
                {['Home Page', 'About Us', 'Contact', 'Gallery', 'Services'].map((tab) => (
                    <button 
                        key={tab} 
                        className={`admin-tab-item ${tab === 'Home Page' ? 'is-active' : ''}`}>
                        {tab}
                    </button>
                ))}
                
                <button className="admin-tab-add-btn">
                    Add Page +
                </button>
            </div>

            <div className="admin-content-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 className="admin-card-header">Edit: Home Page</h2>
                    <span style={{ color: '#22c55e', fontSize: '14px' }}>Visible 👁️</span>
                </div>

                <div className="admin-field-container">
                    <label className="admin-field-label">Hero Title</label>
                    <div className="admin-input-wrapper">
                        <div className="admin-lang-indicator">
                            <span style={{ cursor: 'pointer', color: lang === 'en' ? '#dc2626' : '#a1a1a1' }} onClick={() => setLang('en')}>EN (English)</span>
                            <span style={{ cursor: 'pointer', color: lang === 'ar' ? '#dc2626' : '#a1a1a1' }} onClick={() => setLang('ar')}>AR (العربية)</span>
                        </div>
                        <input 
                            className="admin-field-input"
                            type="text"
                            value={lang === 'en' ? content.hero_title_en : content.hero_title_ar}
                            onChange={(e) => setContent({
                                ...content, 
                                [lang === 'en' ? 'hero_title_en' : 'hero_title_ar']: e.target.value
                            })}
                            placeholder="Enter title here..."
                        />
                    </div>
                </div>

                <div className="admin-field-container">
                    <label className="admin-field-label">Hero Description</label>
                    <div className="admin-input-wrapper">
                        <textarea 
                            className="admin-field-area"
                            rows="4"
                            value={lang === 'en' ? content.hero_desc_en : content.hero_desc_ar}
                            onChange={(e) => setContent({
                                ...content, 
                                [lang === 'en' ? 'hero_desc_en' : 'hero_desc_ar']: e.target.value
                            })}
                            placeholder="Enter description here..."
                        />
                    </div>
                </div>

                <div className="admin-field-container">
                    <label className="admin-field-label">Hero Background Image</label>
                    <div className="admin-upload-dropzone">
                        <div style={{ fontSize: '30px', marginBottom: '10px' }}>🖼️</div>
                        <p>Click to upload or drag and drop</p>
                    </div>
                </div>

                <div className="admin-btn-group">
                    <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="admin-btn-save">
                        {loading ? 'Saving...' : '💾 Save Changes'}
                    </button>
                    <button className="admin-btn-preview">Preview</button>
                </div>
            </div>
        </div>



    );
};

export default WebManagement;