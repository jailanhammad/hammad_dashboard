import React, { useState, useEffect } from 'react';
import './appmanagement.css';
import { supabase } from '../supabase'; 
import { Link, useLocation } from 'react-router-dom';
import ContactManager from './contactmanager';

const ContactContent = () => {

    const location = useLocation(); 
    const isActive = (path) => location.pathname === path;

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

    // const tabs = ['Home Page', 'Explore', 'Contact', 'Gallery', 'Services'];

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
                    <h1 className="admin-main-title">Mobile App Management</h1>
                    <p className="admin-sub-text">Manage mobile application content and features</p>
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
                
                <Link to="/mobile-app">
                    <button className={`admin-tab-item ${isActive('/mobile-app') ? 'is-active' : ''}`}>
                        Home Page
                    </button>
                </Link>

                <Link to="/explore">
                    <button className={`admin-tab-item ${isActive('/explore') ? 'is-active' : ''}`}>
                        Explore
                    </button>
                </Link>


                <Link to="/vehiclesapp">
                    <button className={`admin-tab-item ${isActive('/vehiclesapp') ? 'is-active' : ''}`}>
                        Vehicles
                    </button>
                </Link>


                <Link to="/aboutapp">
                    <button className={`admin-tab-item ${isActive('/aboutapp') ? 'is-active' : ''}`}>
                        About Us
                    </button>
                </Link>

                <Link to="/contactapp">
                    <button className={`admin-tab-item ${isActive('/contactapp') ? 'is-active' : ''}`}>
                        Contact Us
                    </button>
                </Link>

                <Link to="/reviewsapp">
                    <button className={`admin-tab-item ${isActive('/reviewsapp') ? 'is-active' : ''}`}>
                       Reviews
                    </button>
                </Link>
                
                {/* <button className="admin-tab-add-btn">Add Page +</button> */}
            </div>

    

            <div style={{ marginTop: '24px' }}>
                <ContactManager 
                    lang={lang} 
                    content={content} 
                    setContent={setContent} 
                    handleSave={handleSave} 
                    loading={loading} 
                />
            </div>
            
        </div>
    );
};

export default ContactContent;