import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; 
import './webmanagement.css';
import { Link, useLocation } from 'react-router-dom';

import ReviewsManager from './reviewsmanager';
import FooterManager from './footermanager';
import NavManager from './navmanager';


const ContactWebPage = () => {

    const location = useLocation(); 
    const isActive = (path) => location.pathname === path;
    const [lang, setLang] = useState('en'); 
    const [loading, setLoading] = useState(false);

    const [uiData, setUiData] = useState({
        title_en: '', title_ar: '', 
        subtitle_en: '', subtitle_ar: '',
        phone_title_en: '', phone_title_ar: '', 
        number_en: '', number_ar: '', 
        number_2_en: '', number_2_ar: '',
        addr_title_en: '', addr_title_ar: '', 
        addr_1_en: '', addr_1_ar: '', 
        addr_2_en: '', addr_2_ar: '',
        hours_title_en: '', hours_title_ar: '', 
        hours_val_en: '', hours_val_ar: '',
        name_lbl_en: '', name_lbl_ar: '', 
        phone_lbl_en: '', phone_lbl_ar: '', 
        email_lbl_en: '', email_lbl_ar: '', 
        msg_lbl_en: '', msg_lbl_ar: '', 
        send_btn_en: '', send_btn_ar: '', 
        sending_en: '', sending_ar: '',
        success_msg_en: '', success_msg_ar: '', 
        error_msg_en: '', error_msg_ar: ''
    });

    const fetchContactUiData = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('contact_page_ui').select('*');
        if (data) {
            const updatedState = { ...uiData };
            data.forEach(item => {
                updatedState[`${item.key}_en`] = item.en || '';
                updatedState[`${item.key}_ar`] = item.ar || '';
            });
            setUiData(updatedState);
        }
        if (error) console.error('Error fetching contact UI:', error);
        setLoading(false);
    };

    useEffect(() => {
        fetchContactUiData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleContactInputChange = (field, value) => {
        setUiData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
    };

    const handleSaveContactChanges = async () => {
        setLoading(true);
        const keysToSave = [
            'title', 'subtitle', 'phone_title', 'number', 'number_2',
            'addr_title', 'addr_1', 'addr_2', 'hours_title', 'hours_val',
            'name_lbl', 'phone_lbl', 'email_lbl', 'msg_lbl', 'send_btn',
            'sending', 'success_msg', 'error_msg'
        ];

        for (const keyName of keysToSave) {
            const currentText = uiData[`${keyName}_${lang}`] || '';
            
            const { data: existing } = await supabase
                .from('contact_page_ui')
                .select('key')
                .eq('key', keyName)
                .single();

            if (existing) {
                await supabase
                    .from('contact_page_ui')
                    .update({ [lang]: currentText })
                    .eq('key', keyName);
            } else {
                await supabase
                    .from('contact_page_ui')
                    .insert({ key: keyName, [lang]: currentText });
            }
        }

        alert(`Contact Us (${lang.toUpperCase()}) Content Updated Successfully! ✅`);
        fetchContactUiData(); 
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
                <button className="admin-tab-add-btn">Add Page +</button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#aaa', margin: 0 }}>Contact Us Page Content Management</p>
            </div>

            <NavManager />

            <div className="contact-content-box">
                <h3 className="contact-box-title">Modify Contact Page </h3>
                
                {loading ? (
                    <p className="contact-loading-text">Loading Content Setup...</p>
                ) : (
                    <div className="contact-form-wrapper">
                        
                        <div className="grid-two-columns">
                            <div>
                                <label className="input-label-main">Main Title ({lang.toUpperCase()})</label>
                                <input type="text" className="contact-text-input" value={uiData[`title_${lang}`] || ''} onChange={(e) => handleContactInputChange('title', e.target.value)} />
                            </div>
                            <div>
                                <label className="input-label-main">Subtitle ({lang.toUpperCase()})</label>
                                <input type="text" className="contact-text-input" value={uiData[`subtitle_${lang}`] || ''} onChange={(e) => handleContactInputChange('subtitle', e.target.value)} />
                            </div>
                        </div>

   
                        <div className="contact-cards-section">
                            
                            <div className="grid-three-columns">
                                <div className="input-group">
                                    <label className="input-label-sub">Phone Section Title</label>
                                    <input type="text" className="contact-text-input" value={uiData[`phone_title_${lang}`] || ''} onChange={(e) => handleContactInputChange('phone_title', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label-sub">Phone Line 1</label>
                                    <input type="text" className="contact-text-input" value={uiData[`number_${lang}`] || ''} onChange={(e) => handleContactInputChange('number', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label-sub">Phone Line 2</label>
                                    <input type="text" className="contact-text-input" value={uiData[`number_2_${lang}`] || ''} onChange={(e) => handleContactInputChange('number_2', e.target.value)} />
                                </div>
                            </div>
                            
                            <div className="grid-three-columns">
                                <div className="input-group">
                                    <label className="input-label-sub">Address Section Title</label>
                                    <input type="text" className="contact-text-input" value={uiData[`addr_title_${lang}`] || ''} onChange={(e) => handleContactInputChange('addr_title', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label-sub">Branch 1 Address</label>
                                    <input type="text" className="contact-text-input" value={uiData[`addr_1_${lang}`] || ''} onChange={(e) => handleContactInputChange('addr_1', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label-sub">Branch 2 Address</label>
                                    <input type="text" className="contact-text-input" value={uiData[`addr_2_${lang}`] || ''} onChange={(e) => handleContactInputChange('addr_2', e.target.value)} />
                                </div>
                            </div>
                            
                            <div className="grid-two-columns">
                                <div className="input-group">
                                    <label className="input-label-sub">Hours Section Title</label>
                                    <input type="text" className="contact-text-input" value={uiData[`hours_title_${lang}`] || ''} onChange={(e) => handleContactInputChange('hours_title', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label-sub">Working Hours Value</label>
                                    <input type="text" className="contact-text-input" value={uiData[`hours_val_${lang}`] || ''} onChange={(e) => handleContactInputChange('hours_val', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="grid-five-columns">
                            <input type="text" placeholder="Name Field Label" className="contact-text-input" value={uiData[`name_lbl_${lang}`] || ''} onChange={(e) => handleContactInputChange('name_lbl', e.target.value)} />
                            <input type="text" placeholder="Phone Field Label" className="contact-text-input" value={uiData[`phone_lbl_${lang}`] || ''} onChange={(e) => handleContactInputChange('phone_lbl', e.target.value)} />
                            <input type="text" placeholder="Email Field Label" className="contact-text-input" value={uiData[`email_lbl_${lang}`] || ''} onChange={(e) => handleContactInputChange('email_lbl', e.target.value)} />
                            <input type="text" placeholder="Message Field Label" className="contact-text-input" value={uiData[`msg_lbl_${lang}`] || ''} onChange={(e) => handleContactInputChange('msg_lbl', e.target.value)} />
                            <input type="text" placeholder="Send Button Text" className="contact-text-input" value={uiData[`send_btn_${lang}`] || ''} onChange={(e) => handleContactInputChange('send_btn', e.target.value)} />
                        </div>

                        <button onClick={handleSaveContactChanges} className="btn-save-contact">
                            Save Contact Page Text ({lang.toUpperCase()})
                        </button>
                    </div>
                )}
            </div>

            <ReviewsManager />
            <FooterManager />

        </div>
    );
};

export default ContactWebPage;