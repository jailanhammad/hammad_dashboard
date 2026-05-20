import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; 
import './webmanagement.css'; 
import { Link, useLocation } from 'react-router-dom';
import NavManager from './navmanager';
import FooterManager from './footermanager';
import ReviewsManager from './reviewsmanager';
import WhyUsManager from './whyusmanager';

const InstallmentWebPage = () => {
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState('en'); 
    
    const [heroData, setHeroData] = useState(null);

    const [cards, setCards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCardId, setCurrentCardId] = useState(null);

    const [cardForm, setCardForm] = useState({
        title_en: '', title_ar: '',
        paragraph_en: '', paragraph_ar: '',
        list1_en: '', list2_en: '', list3_en: '',
        list1_ar: '', list2_ar: '', list3_ar: '',
        icon_name: 'icon1',
        display_order: 1
    });

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const { data: hero } = await supabase
                .from('installments_hero')
                .select('*')
                .eq('id', 1)
                .single();
            if (hero) setHeroData(hero);

            const { data: cardsList } = await supabase
                .from('installments_cards')
                .select('*')
                .order('display_order', { ascending: true });
            if (cardsList) setCards(cardsList);

        } catch (err) {
            console.error("Fetch Data Error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchAllData(); 
    }, []);

    const handleHeroChange = (field, value) => { 
        setHeroData(prev => ({ ...prev, [field]: value })); 
    };

    const saveHero = async () => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('installments_hero')
                .update({
                    title_en: heroData.title_en,
                    title_ar: heroData.title_ar,
                    desc_en: heroData.desc_en,
                    desc_ar: heroData.desc_ar,
                    bg_url: heroData.bg_url
                })
                .eq('id', 1);

            if (error) {
                alert(`Database Error: ${error.message}`);
            } else {
                alert('Hero Section Updated Successfully! 🚗✨');
                fetchAllData();
            }
        } catch (err) {
            alert(`App Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCardFormChange = (field, value) => { 
        setCardForm(prev => ({ ...prev, [field]: value })); 
    };

    const resetCardForm = () => {
        setCardForm({
            title_en: '', title_ar: '', paragraph_en: '', paragraph_ar: '',
            list1_en: '', list2_en: '', list3_en: '',
            list1_ar: '', list2_ar: '', list3_ar: '',
            icon_name: 'icon1', display_order: cards.length + 1
        });
        setIsEditing(false);
        setCurrentCardId(null);
    };

    const handleEditClick = (card) => {
        setIsEditing(true);
        setCurrentCardId(card.id);
        setCardForm({
            title_en: card.title_en || '',
            title_ar: card.title_ar || '',
            paragraph_en: card.paragraph_en || '',
            paragraph_ar: card.paragraph_ar || '',
            list1_en: card.list_en?.[0] || '',
            list2_en: card.list_en?.[1] || '',
            list3_en: card.list_en?.[2] || '',
            list1_ar: card.list_ar?.[0] || '',
            list2_ar: card.list_ar?.[1] || '',
            list3_ar: card.list_ar?.[2] || '',
            icon_name: card.icon_name || 'icon1',
            display_order: card.display_order || 1
        });
        window.scrollTo({ top: 350, behavior: 'smooth' });
    };

    const handleSaveCard = async () => {
        setLoading(true);
        
        const payload = {
            title_en: cardForm.title_en,
            title_ar: cardForm.title_ar,
            paragraph_en: cardForm.paragraph_en,
            paragraph_ar: cardForm.paragraph_ar,
            list_en: [cardForm.list1_en, cardForm.list2_en, cardForm.list3_en],
            list_ar: [cardForm.list1_ar, cardForm.list2_ar, cardForm.list3_ar],
            icon_name: cardForm.icon_name,
            display_order: cardForm.display_order
        };

        try {
            if (isEditing) {
                const { error } = await supabase.from('installments_cards').update(payload).eq('id', currentCardId);
                if (error) alert(error.message);
                else alert('Card Plan Updated! ');
            } else {
                const { error } = await supabase.from('installments_cards').insert([payload]);
                if (error) alert(error.message);
                else alert('New Plan Card Added!');
            }
            resetCardForm();
            fetchAllData();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCard = async (id) => {
        if (!window.confirm('Are you completely sure you want to delete this plan? ')) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('installments_cards').delete().eq('id', id);
            if (error) alert(error.message);
            else fetchAllData();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !heroData) {
        return <div className="admin-loading-shimmer-box">Loading Installments Panel Safely...</div>;
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
                <Link to="/soonwebsite"><button className={`admin-tab-item ${isActive('/soonwebsite') ? 'is-active' : ''}`}>Coming Soon</button></Link>

                {/* <button className="admin-tab-add-btn">Add Page +</button> */}
            </div>

            <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#aaa', margin: 0 }}>Installments Page Content Management</p>
            </div>

            <NavManager />

            <div className="contact-content-box" style={{ marginTop: '20px' }}>
                <h3 className="contact-box-title">
                    <i className="fa-solid fa-window-restore" style={{ color: '#e50914', marginRight: '8px' }}></i>
                    Manage Installments Hero Section
                </h3>
                <div className="contact-form-wrapper">
                    <div className="contact-cards-section">
                        {lang === 'en' ? (
                            <>
                                <div className="input-group">
                                    <label className="input-label-sub">Main Title (EN)</label>
                                    <input type="text" className="contact-text-input" value={heroData?.title_en || ''} onChange={(e) => handleHeroChange('title_en', e.target.value)} />
                                </div>
                                <div className="input-group" style={{ marginTop: '12px' }}>
                                    <label className="input-label-sub">Description (EN)</label>
                                    <textarea className="contact-text-input" style={{ height: '70px' }} value={heroData?.desc_en || ''} onChange={(e) => handleHeroChange('desc_en', e.target.value)} />
                                </div>
                            </>
                        ) : (
                            <div dir="rtl">
                                <div className="input-group">
                                    <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>العنوان الرئيسي (AR)</label>
                                    <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={heroData?.title_ar || ''} onChange={(e) => handleHeroChange('title_ar', e.target.value)} />
                                </div>
                                <div className="input-group" style={{ marginTop: '12px' }}>
                                    <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>الوصف والسطر المساعد (AR)</label>
                                    <textarea className="contact-text-input" style={{ height: '70px', textAlign: 'right' }} value={heroData?.desc_ar || ''} onChange={(e) => handleHeroChange('desc_ar', e.target.value)} />
                                </div>
                            </div>
                        )}
                        <div className="input-group" style={{ marginTop: '12px' }}>
                            <label className="input-label-sub">Hero Image Background URL</label>
                            <input type="text" className="contact-text-input" value={heroData?.bg_url || ''} onChange={(e) => handleHeroChange('bg_url', e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button onClick={saveHero} className="btn-save-contact" style={{ background: '#e50914', width: 'auto', padding: '10px 25px' }}>
                                Save Hero Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-content-box" style={{ marginTop: '30px' }}>
                <h3 className="contact-box-title">
                    {isEditing ? ' Edit Financing Plan Card' : ' Add New Financing Plan Card'}
                </h3>
                <div className="contact-form-wrapper">
                    <div className="contact-cards-section" style={{ background: '#18181b', border: '1px dashed #27272a', padding: '25px' }}>
                        
                        {lang === 'en' ? (
                            <>
                                <div className="admin-form-split-grid">
                                    <div className="input-group">
                                        <label className="input-label-sub">Card Title (EN)</label>
                                        <input type="text" className="contact-text-input" placeholder="e.g. Low Down Payment" value={cardForm.title_en} onChange={(e) => handleCardFormChange('title_en', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label-sub">Description Paragraph (EN)</label>
                                        <input type="text" className="contact-text-input" placeholder="e.g. Start your journey with as little as 10% down" value={cardForm.paragraph_en} onChange={(e) => handleCardFormChange('paragraph_en', e.target.value)} />
                                    </div>
                                </div>
                                <div className="input-group" style={{ marginTop: '15px' }}>
                                    <label className="input-label-sub">Features List Bullet Points (EN)</label>
                                    <input type="text" className="contact-text-input" placeholder="Feature item 1" value={cardForm.list1_en} onChange={(e) => handleCardFormChange('list1_en', e.target.value)} />
                                    <input type="text" className="contact-text-input" style={{ marginTop: '5px' }} placeholder="Feature item 2" value={cardForm.list2_en} onChange={(e) => handleCardFormChange('list2_en', e.target.value)} />
                                    <input type="text" className="contact-text-input" style={{ marginTop: '5px' }} placeholder="Feature item 3" value={cardForm.list3_en} onChange={(e) => handleCardFormChange('list3_en', e.target.value)} />
                                </div>
                            </>
                        ) : (
                            <div dir="rtl">
                                <div className="admin-form-split-grid">
                                    <div className="input-group">
                                        <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>عنوان الكارت (AR)</label>
                                        <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} placeholder="مثال: مقدم منخفض" value={cardForm.title_ar} onChange={(e) => handleCardFormChange('title_ar', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>وصف الكارت المختصر (AR)</label>
                                        <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} placeholder="مثال: ابدأ رحلتك بمقدم يبدأ من %10 فقط" value={cardForm.paragraph_ar} onChange={(e) => handleCardFormChange('paragraph_ar', e.target.value)} />
                                    </div>
                                </div>
                                <div className="input-group" style={{ marginTop: '15px' }}>
                                    <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>قائمة المزايا والخصائص (AR)</label>
                                    <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} placeholder="البند أو الميزة الأولى" value={cardForm.list1_ar} onChange={(e) => handleCardFormChange('list1_ar', e.target.value)} />
                                    <input type="text" className="contact-text-input" style={{ marginTop: '5px', textAlign: 'right' }} placeholder="البند أو الميزة الثانية" value={cardForm.list2_ar} onChange={(e) => handleCardFormChange('list2_ar', e.target.value)} />
                                    <input type="text" className="contact-text-input" style={{ marginTop: '5px', textAlign: 'right' }} placeholder="البند أو الميزة الثالثة" value={cardForm.list3_ar} onChange={(e) => handleCardFormChange('list3_ar', e.target.value)} />
                                </div>
                            </div>
                        )}

                        <div className="admin-form-split-grid" style={{ marginTop: '20px', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                            <div className="input-group">
                                <label className="input-label-sub" style={{ display: 'block', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                    {lang === 'ar' ? 'معرف أيقونة العرض' : 'Display Icon Identifier'}
                                </label>
                                <select className="contact-text-input" value={cardForm.icon_name} onChange={(e) => handleCardFormChange('icon_name', e.target.value)}>
                                    <option value="icon1">Icon 1 (Gold Dollar Badge)</option>
                                    <option value="icon2">Icon 2 (Fast Lightning Badge)</option>
                                    <option value="icon3">Icon 3 (Growth/Flexible Chart)</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="input-label-sub" style={{ display: 'block', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                    {lang === 'ar' ? 'ترتيب ظهور الكارت' : 'Display Order Position'}
                                </label>
                                <input type="number" className="contact-text-input" min="1" value={cardForm.display_order} onChange={(e) => handleCardFormChange('display_order', parseInt(e.target.value) || 1)} />
                            </div>
                        </div>

                        <div style={{ display: 'none' }}>
                            <input type="text" value={cardForm.title_en} onChange={(e) => handleCardFormChange('title_en', e.target.value)} />
                            <input type="text" value={cardForm.title_ar} onChange={(e) => handleCardFormChange('title_ar', e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '25px', justifyContent: 'flex-end', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                            {isEditing && (
                                <button onClick={resetCardForm} className="btn-save-contact" style={{ background: '#27272a', width: 'auto', padding: '10px 25px' }}>
                                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                                </button>
                            )}
                            <button onClick={handleSaveCard} className="btn-save-contact" style={{ background: '#e50914', width: 'auto', padding: '10px 30px' }}>
                                {isEditing 
                                    ? (lang === 'ar' ? 'تحديث بيانات الكارت الحالي' : 'Update Plan Card') 
                                    : (lang === 'ar' ? 'إدخال وحفظ الكارت الجديد' : 'Insert Plan Card')
                                }
                            </button>
                        </div>
                    </div>
                </div>

                <h3 className="contact-box-title" style={{ marginTop: '45px', display: 'flex', alignItems: 'center', gap: '10px', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    <i className="fa-solid fa-layer-group" style={{ color: '#e50914' }}></i>
                    {lang === 'ar' ? `كروت التقسيط الحالية النشطة (${cards.length})` : `Active Financing Cards (${cards.length})`}
                </h3>

                <div className="admin-cards-grid-layout" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    {cards.length === 0 ? (
                        <div className="no-cards-placeholder">
                            {lang === 'ar' ? 'لا توجد كروت تقسيط مضافة حالياً. قم بإنشاء كارت من الفورم أعلاه!' : 'No installment cards found. Create one using the form above!'}
                        </div>
                    ) : (
                        cards.map((card) => (
                            <div key={card.id} className="admin-custom-premium-card">
                                
                                <div className="admin-card-top-bar" style={{ flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
                                    <span className="admin-card-badge-order">
                                        {lang === 'ar' ? `موضع العرض رقم ${card.display_order}` : `Display Position #${card.display_order}`}
                                    </span>
                                    <div className="admin-card-icon-indicator" style={{ flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
                                        <i className={
                                            card.icon_name === 'icon1' ? 'fa-solid fa-coins' :
                                            card.icon_name === 'icon2' ? 'fa-solid fa-bolt' : 'fa-solid fa-chart-line'
                                        } style={{ color: '#fbbf24', marginLeft: lang === 'ar' ? '6px' : '0', marginRight: lang === 'ar' ? '0' : '6px' }}></i>
                                        <span style={{ fontSize: '12px', color: '#71717a' }}>{card.icon_name}</span>
                                    </div>
                                </div>

                                <div className="admin-card-main-body" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                    {lang === 'en' ? (
                                        <div className="lang-preview-block">
                                            <span className="lang-indicator-tag">EN</span>
                                            <h4>{card.title_en || 'No English Title'}</h4>
                                            <p>{card.paragraph_en || 'No description line'}</p>
                                            {card.list_en && card.list_en.some(i => i) && (
                                                <ul style={{ margin: '10px 0 0 0', paddingLeft: '18px', color: '#71717a', fontSize: '12px' }}>
                                                    {card.list_en.map((item, idx) => item && <li key={idx}>{item}</li>)}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="lang-preview-block">
                                            <span className="lang-indicator-tag" style={{ left: 0, right: 'auto' }}>AR</span>
                                            <h4>{card.title_ar || 'بدون عنوان عربي'}</h4>
                                            <p>{card.paragraph_ar || 'لا يوجد سطر وصفي مساعد'}</p>
                                            {card.list_ar && card.list_ar.some(i => i) && (
                                                <ul style={{ margin: '10px 0 0 0', paddingRight: '18px', paddingLeft: '0', color: '#71717a', fontSize: '12px', listStyleType: 'disc' }}>
                                                    {card.list_ar.map((item, idx) => item && <li key={idx}>{item}</li>)}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="admin-card-action-footer">
                                    <button onClick={() => handleEditClick(card)} className="admin-card-btn edit-btn">
                                        <i className="fa-solid fa-pen"></i> {lang === 'ar' ? 'تعديل الخطة' : 'Edit Plan'}
                                    </button>
                                    <button onClick={() => handleDeleteCard(card.id)} className="admin-card-btn delete-btn">
                                        <i className="fa-solid fa-trash-can"></i> {lang === 'ar' ? 'حذف الكارت' : 'Delete'}
                                    </button>
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

export default InstallmentWebPage;