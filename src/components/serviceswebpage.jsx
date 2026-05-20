import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './webmanagement.css';
import { Link, useLocation } from 'react-router-dom';
import ReviewsManager from './reviewsmanager';
import FooterManager from './footermanager';
import NavManager from './navmanager';
import WhyUsManager from './whyusmanager';

const ServicesWebPage = () => {
    const [loading, setLoading] = useState(true);
    const [heroData, setHeroData] = useState(null);
    const [offers, setOffers] = useState([]);
    const [sellData, setSellData] = useState(null);
    
    const [financeMain, setFinanceMain] = useState(null);
    const [financeFeatures, setFinanceFeatures] = useState([]);

    const [newFeatEn, setNewFeatEn] = useState('');
    const [newFeatAr, setNewFeatAr] = useState('');
    const [newFeatOrder, setNewFeatOrder] = useState(1);

    const location = useLocation(); 
    const isActive = (path) => location.pathname === path;
    const [lang, setLang] = useState('en'); 

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const { data: hero } = await supabase.from('services_hero').select('*').eq('id', 1).single();
            if (hero) setHeroData(hero);
    
            const { data: offerList } = await supabase.from('we_offer').select('*').order('display_order', { ascending: true });
            if (offerList) setOffers(offerList);
    
            const { data: sellSec, error } = await supabase.from('sell_section').select('*').eq('id', 1).single();
            if (sellSec && !error) {
                let featuresEnText = '';
                let featuresArText = '';
    
                if (sellSec.features_en) {
                    if (Array.isArray(sellSec.features_en)) {
                        featuresEnText = sellSec.features_en.join('\n');
                    } else if (typeof sellSec.features_en === 'string') {
                        try {
                            const parsed = JSON.parse(sellSec.features_en);
                            featuresEnText = Array.isArray(parsed) ? parsed.join('\n') : sellSec.features_en;
                        } catch(e) { featuresEnText = sellSec.features_en; }
                    }
                }

                if (sellSec.features_ar) {
                    if (Array.isArray(sellSec.features_ar)) {
                        featuresArText = sellSec.features_ar.join('\n');
                    } else if (typeof sellSec.features_ar === 'string') {
                        try {
                            const parsed = JSON.parse(sellSec.features_ar);
                            featuresArText = Array.isArray(parsed) ? parsed.join('\n') : sellSec.features_ar;
                        } catch(e) { featuresArText = sellSec.features_ar; }
                    }
                }
    
                setSellData({
                    id: sellSec.id || 1, 
                    title_en: sellSec.title_en || '',
                    title_ar: sellSec.title_ar || '',
                    subtitle_en: sellSec.subtitle_en || '',
                    subtitle_ar: sellSec.subtitle_ar || '',
                    description_en: sellSec.description_en || '',
                    description_ar: sellSec.description_ar || '',
                    badge_text: sellSec.badge_text || '',
                    badge_sub_en: sellSec.badge_sub_en || '',
                    badge_sub_ar: sellSec.badge_sub_ar || '',
                    whatsapp_text_en: sellSec.whatsapp_text_en || '',
                    whatsapp_text_ar: sellSec.whatsapp_text_ar || '',
                    features_en: featuresEnText,
                    features_ar: featuresArText
                });
            }

            const { data: finSec } = await supabase.from('finance_section').select('*').single();
            if (finSec) setFinanceMain(finSec);

            const { data: finFeats } = await supabase.from('finance_features').select('*').order('display_order', { ascending: true });
            if (finFeats) setFinanceFeatures(finFeats);

        } catch (err) {
            console.error("Error fetching all data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const handleInputChange = (field, value) => { setHeroData(prev => ({ ...prev, [field]: value })); };
    const handleSaveChanges = async () => {
        if (!heroData) return;
        setLoading(true);
        await supabase.from('services_hero').update({
            tag_en: heroData.tag_en, tag_ar: heroData.tag_ar,
            title_en: heroData.title_en, title_ar: heroData.title_ar,
            desc_en: heroData.desc_en, desc_ar: heroData.desc_ar,
            btn_en: heroData.btn_en, btn_ar: heroData.btn_ar,
            bg_url: heroData.bg_url 
        }).eq('id', heroData.id || 1);
        alert('Services Hero Updated Successfully!');
        fetchAllData();
    };

    const handleOfferChange = (id, field, value) => { setOffers(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o)); };
    const handleSaveOffer = async (id) => {
        const target = offers.find(o => o.id === id);
        if (!target) return;
        setLoading(true);
        await supabase.from('we_offer').update({
            title_en: target.title_en, title_ar: target.title_ar,
            description_en: target.description_en, description_ar: target.description_ar,
            main_img_url: target.main_img_url, bg_img_url: target.bg_img_url,
            icon_class: target.icon_class, display_order: target.display_order
        }).eq('id', id);
        alert('Offer Card Updated Successfully! ');
        fetchAllData();
    };

    const handleSellInputChange = (field, value) => { setSellData(prev => ({ ...prev, [field]: value })); };
    const handleSaveSellSection = async () => {
        if (!sellData) return;
        setLoading(true);
        try {
            const featuresEnArray = sellData.features_en && typeof sellData.features_en === 'string'
                ? sellData.features_en.split('\n').map(f => f.trim()).filter(f => f !== '')
                : [];
            const featuresArArray = sellData.features_ar && typeof sellData.features_ar === 'string'
                ? sellData.features_ar.split('\n').map(f => f.trim()).filter(f => f !== '')
                : [];

            const { error } = await supabase.from('sell_section').update({
                title_en: sellData.title_en, title_ar: sellData.title_ar,
                subtitle_en: sellData.subtitle_en, subtitle_ar: sellData.subtitle_ar,
                description_en: sellData.description_en, description_ar: sellData.description_ar,
                badge_text: sellData.badge_text, badge_sub_en: sellData.badge_sub_en, badge_sub_ar: sellData.badge_sub_ar,
                whatsapp_text_en: sellData.whatsapp_text_en, whatsapp_text_ar: sellData.whatsapp_text_ar,
                features_en: featuresEnArray, features_ar: featuresArArray
            }).eq('id', 1);

            if (error) alert(`Database Error: ${error.message}`);
            else { alert('Sell Section Updated Successfully!'); fetchAllData(); }
        } catch (err) { alert(`App Error: ${err.message}`); } finally { setLoading(false); }
    };

    const handleFinanceMainChange = (field, value) => { setFinanceMain(prev => ({ ...prev, [field]: value })); };
    const handleSaveFinanceMain = async () => {
        if (!financeMain) return;
        setLoading(true);
        const { error } = await supabase.from('finance_section').update({
            title_en: financeMain.title_en, title_ar: financeMain.title_ar,
            subtitle_en: financeMain.subtitle_en, subtitle_ar: financeMain.subtitle_ar,
            label_en: financeMain.label_en, label_ar: financeMain.label_ar,
            down_payment_text_en: financeMain.down_payment_text_en, down_payment_text_ar: financeMain.down_payment_text_ar,
            down_payment_value: financeMain.down_payment_value,
            down_payment_suffix_en: financeMain.down_payment_suffix_en, down_payment_suffix_ar: financeMain.down_payment_suffix_ar
        }).eq('id', financeMain.id || 1);

        if (error) alert(`Finance Save Error: ${error.message}`);
        else { alert('Finance Section Updated Successfully! '); fetchAllData(); }
    };

    const handleFinanceFeatureChange = (id, field, value) => {
        setFinanceFeatures(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
    };
    const handleSaveFinanceFeature = async (id) => {
        const target = financeFeatures.find(f => f.id === id);
        if (!target) return;
        setLoading(true);
        await supabase.from('finance_features').update({
            title_en: target.title_en, title_ar: target.title_ar,
            display_order: target.display_order
        }).eq('id', id);
        alert('Finance Card/Policy Updated Successfully! ');
        fetchAllData();
    };

    const handleAddFinanceFeature = async (e) => {
        e.preventDefault();
        if (!newFeatEn || !newFeatAr) {
            alert('Please fill both English and Arabic titles!');
            return;
        }
        setLoading(true);
        const { error } = await supabase.from('finance_features').insert([
            { title_en: newFeatEn, title_ar: newFeatAr, display_order: newFeatOrder }
        ]);

        if (error) {
            alert(`Error adding item: ${error.message}`);
        } else {
            alert('New Finance Item Added Successfully! ➕🚀');
            setNewFeatEn('');
            setNewFeatAr('');
            setNewFeatOrder(1);
            fetchAllData();
        }
    };

    const handleDeleteFinanceFeature = async (id) => {
        if (!window.confirm('Are you sure you want to delete this policy/card? ')) return;
        setLoading(true);
        const { error } = await supabase.from('finance_features').delete().eq('id', id);

        if (error) {
            alert(`Error deleting item: ${error.message}`);
        } else {
            alert('Item Deleted Successfully! ');
            fetchAllData();
        }
    };

    if (loading || !heroData || !sellData || !financeMain) {
        return (
            <div style={{ color: '#fff', textAlign: 'center', padding: '50px', fontSize: '18px', background: '#111', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Loading Dashboard Data Safely...
            </div>
        );
    }

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

                {/* <button className="admin-tab-add-btn">Add Page +</button> */}
            </div>

            <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#aaa', margin: 0 }}>Services Page Content Management</p>
            </div>

            <NavManager />

            <div className="contact-content-box">
                <h3 className="contact-box-title">Manage Services Hero Section</h3>
                <div className="contact-form-wrapper">
                    <div className="contact-cards-section">
                        {lang === 'en' ? (
                            <>
                                <div className="grid-two-columns">
                                    <div className="input-group"><label className="input-label-sub">Tagline (EN)</label><input type="text" className="contact-text-input" value={heroData.tag_en || ''} onChange={(e) => handleInputChange('tag_en', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub">Title (EN)</label><input type="text" className="contact-text-input" value={heroData.title_en || ''} onChange={(e) => handleInputChange('title_en', e.target.value)} /></div>
                                </div>
                                <div className="grid-two-columns" style={{ marginTop: '10px' }}>
                                    <div className="input-group"><label className="input-label-sub">Description (EN)</label><textarea className="contact-text-input" style={{ height: '70px' }} value={heroData.desc_en || ''} onChange={(e) => handleInputChange('desc_en', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub">Button Text (EN)</label><input type="text" className="contact-text-input" value={heroData.btn_en || ''} onChange={(e) => handleInputChange('btn_en', e.target.value)} /></div>
                                </div>
                            </>
                        ) : (
                            <div dir="rtl">
                                <div className="grid-two-columns">
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>السطر الفرعي</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={heroData.tag_ar || ''} onChange={(e) => handleInputChange('tag_ar', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>العنوان الرئيسي</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={heroData.title_ar || ''} onChange={(e) => handleInputChange('title_ar', e.target.value)} /></div>
                                </div>
                                <div className="grid-two-columns" style={{ marginTop: '10px' }}>
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>الوصف</label><textarea className="contact-text-input" style={{ height: '70px', textAlign: 'right' }} value={heroData.desc_ar || ''} onChange={(e) => handleInputChange('desc_ar', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>نص الزرار</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={heroData.btn_ar || ''} onChange={(e) => handleInputChange('btn_ar', e.target.value)} /></div>
                                </div>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button onClick={handleSaveChanges} className="btn-save-contact" style={{ width: 'auto', padding: '10px 25px' }}>Save Hero Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-content-box" style={{ marginTop: '30px' }}>
                <h3 className="contact-box-title">Manage "What We Offer" Cards</h3>
                <div className="contact-form-wrapper">
                    {offers.map((item, idx) => (
                        <div key={item.id || idx} className="contact-cards-section" style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                            {lang === 'en' ? (
                                <>
                                    <div className="grid-two-columns">
                                        <div className="input-group"><label className="input-label-sub">Title (EN)</label><input type="text" className="contact-text-input" value={item.title_en || ''} onChange={(e) => handleOfferChange(item.id, 'title_en', e.target.value)} /></div>
                                        <div className="input-group"><label className="input-label-sub">Display Order</label><input type="number" className="contact-text-input" value={item.display_order || 0} onChange={(e) => handleOfferChange(item.id, 'display_order', parseInt(e.target.value) || 0)} /></div>
                                    </div>
                                    <div className="input-group" style={{ marginTop: '10px' }}><label className="input-label-sub">Description (EN)</label><textarea className="contact-text-input" style={{ height: '50px' }} value={item.description_en || ''} onChange={(e) => handleOfferChange(item.id, 'description_en', e.target.value)} /></div>
                                </>
                            ) : (
                                <div dir="rtl">
                                    <div className="grid-two-columns">
                                        <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>العنوان (AR)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={item.title_ar || ''} onChange={(e) => handleOfferChange(item.id, 'title_ar', e.target.value)} /></div>
                                        <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>الترتيب</label><input type="number" className="contact-text-input" style={{ textAlign: 'right' }} value={item.display_order || 0} onChange={(e) => handleOfferChange(item.id, 'display_order', parseInt(e.target.value) || 0)} /></div>
                                    </div>
                                    <div className="input-group" style={{ marginTop: '10px' }}><label className="input-label-sub" style={{ textAlign: 'right' }}>الوصف (AR)</label><textarea className="contact-text-input" style={{ height: '50px', textAlign: 'right' }} value={item.description_ar || ''} onChange={(e) => handleOfferChange(item.id, 'description_ar', e.target.value)} /></div>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <button onClick={() => handleSaveOffer(item.id)} className="btn-save-contact" style={{ width: 'auto', padding: '6px 20px', background: '#e50914' }}>Save Card</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="contact-content-box" style={{ marginTop: '30px' }}>
                <h3 className="contact-box-title">Manage Sell Section (Section 3)</h3>
                <div className="contact-form-wrapper">
                    <div className="contact-cards-section">
                        {lang === 'en' ? (
                            <>
                                <h4 style={{ color: '#e50914', marginTop: 0 }}>English Content</h4>
                                <div className="grid-two-columns">
                                    <div className="input-group"><label className="input-label-sub">Title (EN)</label><input type="text" className="contact-text-input" value={sellData.title_en || ''} onChange={(e) => handleSellInputChange('title_en', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub">Subtitle (EN)</label><input type="text" className="contact-text-input" value={sellData.subtitle_en || ''} onChange={(e) => handleSellInputChange('subtitle_en', e.target.value)} /></div>
                                </div>
                                <div className="input-group" style={{ marginTop: '10px' }}><label className="input-label-sub">Description (EN)</label><textarea className="contact-text-input" style={{ height: '60px' }} value={sellData.description_en || ''} onChange={(e) => handleSellInputChange('description_en', e.target.value)} /></div>
                                <div className="grid-two-columns" style={{ marginTop: '10px' }}>
                                    <div className="input-group"><label className="input-label-sub">Badge Subtitle (EN)</label><input type="text" className="contact-text-input" value={sellData.badge_sub_en || ''} onChange={(e) => handleSellInputChange('badge_sub_en', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub">WhatsApp Text (EN)</label><input type="text" className="contact-text-input" value={sellData.whatsapp_text_en || ''} onChange={(e) => handleSellInputChange('whatsapp_text_en', e.target.value)} /></div>
                                </div>
                                <div className="input-group" style={{ marginTop: '10px' }}>
                                    <label className="input-label-sub">Features List (EN) - <span style={{color: '#aaa'}}>Write each feature on a new line</span></label>
                                    <textarea className="contact-text-input" style={{ height: '100px', lineHeight: '20px' }} value={sellData.features_en || ''} onChange={(e) => handleSellInputChange('features_en', e.target.value)} />
                                </div>
                            </>
                        ) : (
                            <div dir="rtl">
                                <h4 style={{ color: '#e50914', marginTop: 0, textAlign: 'right' }}>المحتوى العربي</h4>
                                <div className="grid-two-columns">
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>العنوان (AR)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={sellData.title_ar || ''} onChange={(e) => handleSellInputChange('title_ar', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>العنوان الفرعي (AR)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={sellData.subtitle_ar || ''} onChange={(e) => handleSellInputChange('subtitle_ar', e.target.value)} /></div>
                                </div>
                                <div className="input-group" style={{ marginTop: '10px' }}><label className="input-label-sub" style={{ textAlign: 'right' }}>الوصف (AR)</label><textarea className="contact-text-input" style={{ height: '60px', textAlign: 'right' }} value={sellData.description_ar || ''} onChange={(e) => handleSellInputChange('description_ar', e.target.value)} /></div>
                                <div className="grid-two-columns" style={{ marginTop: '10px' }}>
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>نص الشارة الفرعي (AR)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={sellData.badge_sub_ar || ''} onChange={(e) => handleSellInputChange('badge_sub_ar', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>نص زر الـ WhatsApp (AR)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={sellData.whatsapp_text_ar || ''} onChange={(e) => handleSellInputChange('whatsapp_text_ar', e.target.value)} /></div>
                                </div>
                                <div className="input-group" style={{ marginTop: '10px' }}>
                                    <label className="input-label-sub" style={{ textAlign: 'right' }}>قائمة المزايا (AR) - <span style={{color: '#aaa'}}>اكتب كل ميزة في سطر منفصل</span></label>
                                    <textarea className="contact-text-input" style={{ height: '100px', lineHeight: '20px', textAlign: 'right' }} value={sellData.features_ar || ''} onChange={(e) => handleSellInputChange('features_ar', e.target.value)} />
                                </div>
                            </div>
                        )}
                        
                        <h4 style={{ color: '#e50914', marginTop: '20px' }}>General Settings</h4>
                        <div className="input-group">
                            <label className="input-label-sub">Badge Text (e.g., 100%)</label>
                            <input type="text" className="contact-text-input" value={sellData.badge_text || ''} onChange={(e) => handleSellInputChange('badge_text', e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button onClick={handleSaveSellSection} className="btn-save-contact" style={{ width: 'auto', padding: '10px 25px', background: '#e50914' }}>Save Sell Section Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-content-box" style={{ marginTop: '30px' }}>
                <h3 className="contact-box-title">Manage Installments & Financing (Section 4)</h3>
                <div className="contact-form-wrapper">
                    <div className="contact-cards-section">
                        {lang === 'en' ? (
                            <>
                                <h4 style={{ marginTop: 0 }}>Finance Main Headers (EN)</h4>
                                <div className="grid-two-columns">
                                    <div className="input-group"><label className="input-label-sub">Main Title (EN)</label><input type="text" className="contact-text-input" value={financeMain.title_en || ''} onChange={(e) => handleFinanceMainChange('title_en', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub">Label (EN)</label><input type="text" className="contact-text-input" value={financeMain.label_en || ''} onChange={(e) => handleFinanceMainChange('label_en', e.target.value)} /></div>
                                </div>
                                <div className="input-group" style={{ marginTop: '10px' }}><label className="input-label-sub">Subtitle (EN)</label><textarea className="contact-text-input" style={{ height: '50px' }} value={financeMain.subtitle_en || ''} onChange={(e) => handleFinanceMainChange('subtitle_en', e.target.value)} /></div>
                                
                                <h4 style={{  marginTop: '20px' }}>Down Payment Footer Text (EN)</h4>
                                <div className="grid-two-columns">
                                    <div className="input-group"><label className="input-label-sub">Prefix Text (e.g., Starting from)</label><input type="text" className="contact-text-input" value={financeMain.down_payment_text_en || ''} onChange={(e) => handleFinanceMainChange('down_payment_text_en', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub">Suffix Text (e.g., Down Payment)</label><input type="text" className="contact-text-input" value={financeMain.down_payment_suffix_en || ''} onChange={(e) => handleFinanceMainChange('down_payment_suffix_en', e.target.value)} /></div>
                                </div>
                            </>
                        ) : (
                            <div dir="rtl">
                                <h4 style={{  marginTop: 0, textAlign: 'right' }}>بيانات التمويل والتقسيط (عربي)</h4>
                                <div className="grid-two-columns">
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>العنوان الرئيسي (AR)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={financeMain.title_ar || ''} onChange={(e) => handleFinanceMainChange('title_ar', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>نص الخطط الفرعي (AR)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={financeMain.label_ar || ''} onChange={(e) => handleFinanceMainChange('label_ar', e.target.value)} /></div>
                                </div>
                                <div className="input-group" style={{ marginTop: '10px' }}><label className="input-label-sub" style={{ textAlign: 'right' }}>العنوان المساعد أو الوصف (AR)</label><textarea className="contact-text-input" style={{ height: '50px', textAlign: 'right' }} value={financeMain.subtitle_ar || ''} onChange={(e) => handleFinanceMainChange('subtitle_ar', e.target.value)} /></div>
                                
                                <h4 style={{  marginTop: '20px', textAlign: 'right' }}>نص المقدم في الأسفل (عربي)</h4>
                                <div className="grid-two-columns">
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>النص المسبق (مثال: يبدأ من)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={financeMain.down_payment_text_ar || ''} onChange={(e) => handleFinanceMainChange('down_payment_text_ar', e.target.value)} /></div>
                                    <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>النص اللاحق (مثال: مقدم)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={financeMain.down_payment_suffix_ar || ''} onChange={(e) => handleFinanceMainChange('down_payment_suffix_ar', e.target.value)} /></div>
                                </div>
                            </div>
                        )}

                        <h4 style={{  marginTop: '20px' }}>Global Finance Value</h4>
                        <div className="input-group">
                            <label className="input-label-sub">Down Payment Percentage Value (e.g., 10%)</label>
                            <input type="text" className="contact-text-input" value={financeMain.down_payment_value || ''} onChange={(e) => handleFinanceMainChange('down_payment_value', e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button onClick={handleSaveFinanceMain} className="btn-save-contact" style={{ width: 'auto', padding: '10px 25px', background: '#e50914' }}>Save Finance Main Settings</button>
                        </div>
                    </div>
                </div>

                <h3 className="contact-box-title" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #222' }}>➕ Add New Finance Policy or Feature Card</h3>
                <div className="contact-form-wrapper">
                    <form onSubmit={handleAddFinanceFeature} className="contact-cards-section" style={{ background: '#1c1c1e', border: '1px dashed ', padding: '20px', borderRadius: '8px' }}>
                        <div className="grid-two-columns">
                            <div className="input-group">
                                <label className="input-label-sub">Title / Policy Text (English)</label>
                                <input type="text" className="contact-text-input" placeholder="e.g. Flexible Terms or Income policy..." value={newFeatEn} onChange={(e) => setNewFeatEn(e.target.value)} />
                            </div>
                            <div className="input-group" dir="rtl">
                                <label className="input-label-sub" style={{ textAlign: 'right' }}>نص السياسة / عنوان الكارت (عربي)</label>
                                <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} placeholder="مثال: شروط مرنة أو سياسة الدخل..." value={newFeatAr} onChange={(e) => setNewFeatAr(e.target.value)} />
                            </div>
                        </div>
                        <div className="input-group" style={{ marginTop: '12px', maxWidth: '200px' }}>
                            <label className="input-label-sub">Display Order</label>
                            <input type="number" className="contact-text-input" value={newFeatOrder} onChange={(e) => setNewFeatOrder(parseInt(e.target.value) || 1)} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button type="submit" className="btn-save-contact" style={{ width: 'auto', padding: '10px 30px', background: '#e50914' }}>+ Add New Item</button>
                        </div>
                    </form>
                </div>

                <h3 className="contact-box-title" style={{ marginTop: '40px' }}>Existing Finance Policies & Feature Cards ({financeFeatures.length})</h3>
                <div className="contact-form-wrapper">
                    {financeFeatures.length === 0 ? (
                        <p style={{ color: '#aaa', padding: '10px' }}>No policies or cards found. Add one above!</p>
                    ) : (
                        financeFeatures.map((feat, idx) => (
                            <div key={feat.id || idx} className="contact-cards-section" style={{ border: '1px solid #222', padding: '15px', borderRadius: '8px', marginBottom: '15px', background: '#141414' }}>
                                {lang === 'en' ? (
                                    <div className="grid-two-columns">
                                        <div className="input-group"><label className="input-label-sub">Card Title (EN)</label><input type="text" className="contact-text-input" value={feat.title_en || ''} onChange={(e) => handleFinanceFeatureChange(feat.id, 'title_en', e.target.value)} /></div>
                                        <div className="input-group"><label className="input-label-sub">Display Order</label><input type="number" className="contact-text-input" value={feat.display_order || 0} onChange={(e) => handleFinanceFeatureChange(feat.id, 'display_order', parseInt(e.target.value) || 0)} /></div>
                                    </div>
                                ) : (
                                    <div dir="rtl" className="grid-two-columns">
                                        <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>عنوان الكارت (AR)</label><input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={feat.title_ar || ''} onChange={(e) => handleFinanceFeatureChange(feat.id, 'title_ar', e.target.value)} /></div>
                                        <div className="input-group"><label className="input-label-sub" style={{ textAlign: 'right' }}>الترتيب</label><input type="number" className="contact-text-input" style={{ textAlign: 'right' }} value={feat.display_order || 0} onChange={(e) => handleFinanceFeatureChange(feat.id, 'display_order', parseInt(e.target.value) || 0)} /></div>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                                    <button onClick={() => handleDeleteFinanceFeature(feat.id)} className="btn-save-contact" style={{ width: 'auto', padding: '6px 20px', background: '#e50914' }}>Delete</button>
                                    <button onClick={() => handleSaveFinanceFeature(feat.id)} className="btn-save-contact" style={{ width: 'auto', padding: '6px 20px', background: '#222222' }}>Update</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <WhyUsManager />
            <ReviewsManager />
            <FooterManager />
        </div>
    );
};

export default ServicesWebPage;