import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase'; 
import './webmanagement.css'; 
import { Link, useLocation } from 'react-router-dom';
import NavManager from './navmanager';
import FooterManager from './footermanager';
import ReviewsManager from './reviewsmanager';
import WhyUsManager from './whyusmanager';


const SoonWebPage = () => {
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState('en'); 

    const [heroData, setHeroData] = useState(null);

    const [cars, setCars] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCarId, setCurrentCarId] = useState(null);

    const [carForm, setCarForm] = useState({
        name_en: '', name_ar: '',
        specs_en: '', specs_ar: '',
        release_date: '', img_url: ''
    });

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const fetchAllData = useCallback(async () => {
        setLoading(true);
        try {
            const { data: hero, error: heroError } = await supabase.from('coming_soon_hero').select('*').eq('id', 1).single();
            if (hero) setHeroData(hero);
            if (heroError) console.error(heroError.message);

            const { data: carsList, error: carsError } = await supabase.from('coming_soon_cars').select('*').order('id', { ascending: true });
            if (carsList) setCars(carsList);
            if (carsError) console.error(carsError.message);
        } catch (err) {
            console.error("Fetch Data Error:", err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const handleHeroChange = (field, value) => {
        setHeroData(prev => ({ ...prev, [field]: value }));
    };

    const saveHero = async () => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('coming_soon_hero')
                .update({
                    badge_en: heroData.badge_en,
                    badge_ar: heroData.badge_ar,
                    title_en: heroData.title_en,   
                    title_ar: heroData.title_ar,  
                    desc_en: heroData.desc_en,
                    desc_ar: heroData.desc_ar
                })
                .eq('id', 1);

            if (error) alert(`Database Error: ${error.message}`);
            else {
                alert('Coming Soon Hero & Titles Updated! 🏆🏁');
                fetchAllData();
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCarFormChange = (field, value) => {
        setCarForm(prev => ({ ...prev, [field]: value }));
    };

    const resetCarForm = () => {
        setCarForm({ name_en: '', name_ar: '', specs_en: '', specs_ar: '', release_date: '', img_url: '' });
        setIsEditing(false);
        setCurrentCarId(null);
    };

    const handleEditClick = (car) => {
        setIsEditing(true);
        setCurrentCarId(car.id);
        setCarForm({
            name_en: car.name_en || '',
            name_ar: car.name_ar || '',
            specs_en: car.specs_en || '',
            specs_ar: car.specs_ar || '',
            release_date: car.release_date || '',
            img_url: car.img_url || ''
        });
        window.scrollTo({ top: 450, behavior: 'smooth' });
    };

    const handleSaveCar = async () => {
        const finalNameEn = carForm.name_en || carForm.name_ar;
        const finalNameAr = carForm.name_ar || carForm.name_en;
        const finalSpecsEn = carForm.specs_en || carForm.specs_ar || '';
        const finalSpecsAr = carForm.specs_ar || carForm.specs_en || '';

        if (!finalNameEn || !carForm.release_date || !carForm.img_url || carForm.img_url === 'https') {
            alert('رجاءً املئي اسم السيارة، تاريخ الإطلاق، ورابط الصورة بالكامل.');
            return;
        }
        
        setLoading(true);
        const payload = {
            name_en: finalNameEn,
            name_ar: finalNameAr,
            specs_en: finalSpecsEn,
            specs_ar: finalSpecsAr,
            release_date: carForm.release_date,
            img_url: carForm.img_url
        };

        try {
            if (isEditing) {
                const { error } = await supabase.from('coming_soon_cars').update(payload).eq('id', currentCarId);
                if (error) alert(error.message);
                else alert('Upcoming Car Data Updated Successfully! ');
            } else {
                const { error } = await supabase.from('coming_soon_cars').insert([payload]);
                if (error) alert(error.message);
                else alert('New Upcoming Car Registered! ');
            }
            resetCarForm();
            fetchAllData();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCar = async (id) => {
        if (!window.confirm('Are you absolutely sure you want to remove this car from the countdown? ')) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('coming_soon_cars').delete().eq('id', id);
            if (error) alert(error.message);
            else fetchAllData();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !heroData) {
        return <div className="admin-loading-shimmer-box">Loading Coming Soon Panel Parameters...</div>;
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
                <Link to="/recommended"><button className={`admin-tab-item ${isActive('/recommended') ? 'is-active' : ''}`}>Recommended</button></Link>

                {/* <button className="admin-tab-add-btn">Add Page +</button> */}
            </div>

            <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#aaa', margin: 0 }}>Coming Soon Page Content Management</p>
            </div>

            <NavManager />

            <div className="contact-content-box" style={{ marginTop: '20px' }}>
                <h3 className="contact-box-title" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    <i className="fa-solid fa-flag-checkered" style={{ color: '#e31b23', marginLeft: lang === 'ar' ? '0' : '8px', marginRight: lang === 'ar' ? '8px' : '0' }}></i>
                    {lang === 'ar' ? 'الجدول الأول: إدارة عناوين ونصوص الهيرو العليا' : 'Table 1: Manage Layout Header Titles'}
                </h3>
                <div className="contact-form-wrapper">
                    <div className="contact-cards-section">
                        {lang === 'en' ? (
                            <>
                                <div className="input-group">
                                    <label className="input-label-sub">Top Glowing Badge (EN)</label>
                                    <input type="text" className="contact-text-input" value={heroData?.badge_en || ''} onChange={(e) => handleHeroChange('badge_en', e.target.value)} />
                                </div>
                                <div className="input-group" style={{ marginTop: '12px' }}>
                                    <label className="input-label-sub">Main Section Title (EN)</label>
                                    <input type="text" className="contact-text-input" value={heroData?.title_en || ''} onChange={(e) => handleHeroChange('title_en', e.target.value)} placeholder="e.g. COMING SOON" />
                                </div>
                                <div className="input-group" style={{ marginTop: '12px' }}>
                                    <label className="input-label-sub">Sub-Description Box (EN)</label>
                                    <textarea className="contact-text-input" style={{ height: '70px' }} value={heroData?.desc_en || ''} onChange={(e) => handleHeroChange('desc_en', e.target.value)} />
                                </div>
                            </>
                        ) : (
                            <div dir="rtl">
                                <div className="input-group">
                                    <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>شارة التميز العلوية (AR)</label>
                                    <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={heroData?.badge_ar || ''} onChange={(e) => handleHeroChange('badge_ar', e.target.value)} />
                                </div>
                                <div className="input-group" style={{ marginTop: '12px' }}>
                                    <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>العنوان الرئيسي للمقطع (AR)</label>
                                    <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} value={heroData?.title_ar || ''} onChange={(e) => handleHeroChange('title_ar', e.target.value)} placeholder="مثال: قريباً جداً" />
                                </div>
                                <div className="input-group" style={{ marginTop: '12px' }}>
                                    <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>الوصف والسطر المساعد (AR)</label>
                                    <textarea className="contact-text-input" style={{ height: '70px', textAlign: 'right' }} value={heroData?.desc_ar || ''} onChange={(e) => handleHeroChange('desc_ar', e.target.value)} />
                                </div>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button onClick={saveHero} className="btn-save-contact" style={{ background: '#e31b23', width: 'auto', padding: '10px 25px' }}>
                                Save Header Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-content-box" style={{ marginTop: '30px' }}>
                <h3 className="contact-box-title" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    <i className="fa-solid fa-plus-circle" style={{ color: '#e31b23' }}></i>
                    {isEditing 
                        ? (lang === 'ar' ? 'تعديل معايير المركبة الحالية' : 'Edit Upcoming Vehicle Specs') 
                        : (lang === 'ar' ? 'إضافة سيارة جيل قادم جديدة لجدول البيانات' : 'Add Next-Gen Future Vehicle')
                    }
                </h3>
                <div className="contact-form-wrapper">
                    <div className="contact-cards-section" style={{ background: '#18181b', border: '1px dashed #27272a', padding: '25px' }}>
                        
                        {lang === 'en' ? (
                            <div className="admin-form-split-grid">
                                <div className="input-group">
                                    <label className="input-label-sub">Vehicle Public Name (EN) *</label>
                                    <input type="text" className="contact-text-input" placeholder="e.g. Range Rover Sport" value={carForm.name_en} onChange={(e) => handleCarFormChange('name_en', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label-sub">Technical Performance Specs (EN)</label>
                                    <input type="text" className="contact-text-input" placeholder="e.g. 0-100: 3.0s | 523 HP" value={carForm.specs_en} onChange={(e) => handleCarFormChange('specs_en', e.target.value)} />
                                </div>
                            </div>
                        ) : (
                            <div dir="rtl" className="admin-form-split-grid">
                                <div className="input-group">
                                    <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>اسم السيارة التسويقي (AR) *</label>
                                    <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} placeholder="مثال: رنج روفر سبورت" value={carForm.name_ar} onChange={(e) => handleCarFormChange('name_ar', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label-sub" style={{ display: 'block', textAlign: 'right' }}>المواصفات الفنية الحركية (AR)</label>
                                    <input type="text" className="contact-text-input" style={{ textAlign: 'right' }} placeholder="مثال: 0-100: 3.0 ثانية | 626 حصان" value={carForm.specs_ar} onChange={(e) => handleCarFormChange('specs_ar', e.target.value)} />
                                </div>
                            </div>
                        )}

                        <div className="admin-form-split-grid" style={{ marginTop: '15px', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                            <div className="input-group">
                                <label className="input-label-sub" style={{ display: 'block', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                    {lang === 'ar' ? 'تاريخ الإطلاق الرسمي للعداد التنازلي *' : 'Target Release Launch Date *'}
                                </label>
                                <input type="date" className="contact-text-input" value={carForm.release_date} onChange={(e) => handleCarFormChange('release_date', e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label className="input-label-sub" style={{ display: 'block', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                    {lang === 'ar' ? 'رابط صورة السيارة الواضحة *' : 'Vehicle Clear Image Asset URL *'}
                                </label>
                                <input type="text" className="contact-text-input" placeholder="https://..." value={carForm.img_url} onChange={(e) => handleCarFormChange('img_url', e.target.value)} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '25px', justifyContent: 'flex-end', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                            {isEditing && (
                                <button onClick={resetCarForm} className="btn-save-contact" style={{ background: '#27272a', width: 'auto', padding: '10px 25px' }}>
                                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                                </button>
                            )}
                            <button onClick={handleSaveCar} className="btn-save-contact" style={{ background: '#e31b23', width: 'auto', padding: '10px 30px' }}>
                                {isEditing 
                                    ? (lang === 'ar' ? 'حفظ وتحديث بيانات الجدول' : 'Update Vehicle Data') 
                                    : (lang === 'ar' ? 'إدراج السيارة في الجدول' : 'Insert Future Vehicle')
                                }
                            </button>
                        </div>
                    </div>
                </div>

                <h3 className="contact-box-title" style={{ marginTop: '45px', display: 'flex', alignItems: 'center', gap: '10px', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    <i className="fa-solid fa-table" style={{ color: '#e31b23' }}></i>
                    {lang === 'ar' ? `الجدول الثاني: سجل السيارات المنتظرة الحالية (${cars.length})` : `Table 2: Registered Upcoming Supercars Logs (${cars.length})`}
                </h3>

                <div className="admin-table-responsive-wrapper" style={{ marginTop: '15px', direction: lang === 'ar' ? 'rtl' : 'ltr', overflowX: 'auto' }}>
                    <table className="admin-premium-data-table" style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', background: '#111', borderRadius: '8px', overflow: 'hidden' }}>
                        <thead>
                            <tr style={{ background: '#1c1c1e', borderBottom: '2px solid #2c2c2e', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                <th style={{ padding: '14px' }}>ID</th>
                                <th style={{ padding: '14px' }}>{lang === 'ar' ? 'صورة السيارة' : 'Asset Preview'}</th>
                                <th style={{ padding: '14px' }}>{lang === 'ar' ? 'اسم الموديل' : 'Vehicle Model Name'}</th>
                                <th style={{ padding: '14px' }}>{lang === 'ar' ? 'الأداء والمواصفات' : 'Performance Specs'}</th>
                                <th style={{ padding: '14px' }}>{lang === 'ar' ? 'تاريخ العرض' : 'Target Launch'}</th>
                                <th style={{ padding: '14px', textAlign: 'center' }}>{lang === 'ar' ? 'خيارات التحكم' : 'Control Actions'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#71717a' }}>
                                        {lang === 'ar' ? 'لا توجد سجلات سيارات منشأة حالياً.' : 'No vehicle records found on database.'}
                                    </td>
                                </tr>
                            ) : (
                                cars.map((car) => (
                                    <tr key={car.id} style={{ borderBottom: '1px solid #27272a', backgroundColor: '#141416' }}>
                                        <td style={{ padding: '14px', fontWeight: 'bold', color: '#e31b23' }}>#{car.id}</td>
                                        <td style={{ padding: '14px' }}>
                                            {car.img_url && (
                                                <img src={car.img_url} alt="asset" style={{ width: '65px', height: '40px', objectFit: 'contain', background: '#000', borderRadius: '4px', border: '1px solid #2c2c2e' }} />
                                            )}
                                        </td>
                                        <td style={{ padding: '14px', fontWeight: '500' }}>
                                            {lang === 'en' ? car.name_en : car.name_ar}
                                        </td>
                                        <td style={{ padding: '14px', color: '#a1a1aa', fontSize: '13px' }}>
                                            {lang === 'en' ? car.specs_en : car.specs_ar}
                                        </td>
                                        <td style={{ padding: '14px', color: '#fbbf24', fontSize: '13px', fontFamily: 'monospace' }}>
                                            {car.release_date}
                                        </td>
                                        <td style={{ padding: '14px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <button onClick={() => handleEditClick(car)} style={{ background: '#27272a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                                                    <i className="fa-solid fa-pen"></i> {lang === 'ar' ? 'تعديل' : 'Edit'}
                                                </button>
                                                <button onClick={() => handleDeleteCar(car.id)} style={{ background: '#e31b23', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                                                    <i className="fa-solid fa-trash"></i> {lang === 'ar' ? 'حذف' : 'Delete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            <WhyUsManager />
            <ReviewsManager />
            <FooterManager />
        </div>
    );
};

export default SoonWebPage;