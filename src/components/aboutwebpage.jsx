import React, { useState, useEffect } from 'react';
import './webmanagement.css';
import { supabase } from '../supabase'; 
import ReviewsManager from './reviewsmanager';
import FooterManager from './footermanager';
import NavManager from './navmanager';
import { Link, useLocation } from 'react-router-dom';

const AboutWebPage = () => {
    const location = useLocation(); 
    const isActive = (path) => location.pathname === path;

    const [lang, setLang] = useState('en'); 
    const [loading, setLoading] = useState(false);

    const [content, setContent] = useState({
        title_en: '', title_ar: '', description_en: '', description_ar: '', image_url: ''
    });
    const [newDef, setNewDef] = useState({ make_en: '', make_ar: '', model_en: '', model_ar: '' });
    const [ctaContent, setCtaContent] = useState([]);

    const [storyData, setStoryData] = useState({
        sub_label_en: '', sub_label_ar: '',
        headline_en: '', headline_ar: '',
        founder_text1_en: '', founder_text1_ar: '',
        founder_text2_en: '', founder_text2_ar: '',
        stat1_desc_en: '', stat1_desc_ar: '',
        stat2_desc_en: '', stat2_desc_ar: '',
        mission_title_en: '', mission_title_ar: '',
        mission_desc_en: '', mission_desc_ar: '',
        vision_title_en: '', vision_title_ar: '',
        vision_desc_en: '', vision_desc_ar: ''
    });

    const fetchContent = async () => {
        const { data } = await supabase.from('website_sections').select('*').eq('section_key', 'hero_section').single(); 
        if (data) {
            setContent({
                title_en: data.title_en || '', title_ar: data.title_ar || '',
                description_en: data.description_en || '', description_ar: data.description_ar || '',
                image_url: data.image_url || ''
            });
        }
    };

    const fetchCarDefinitions = async () => {
        await supabase.from('car_definitions').select('*');
    };

    const fetchCTA = async () => {
        const { data } = await supabase.from('home_cta_sections').select('*').order('type', { ascending: true });
        if (data) setCtaContent(data);
    };

    const fetchAboutData = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('story_v2').select('*');
        if (data && data.length > 0) {
            const updatedState = { ...storyData };
            data.forEach(item => {
                const baseKey = item.key.replace('story_v2.', '');
                updatedState[`${baseKey}_en`] = item.en || '';
                updatedState[`${baseKey}_ar`] = item.ar || '';
            });
            setStoryData(updatedState);
        }
        if (error) console.error('Error fetching story data:', error);
        setLoading(false);
    };

    useEffect(() => {
        fetchContent();
        fetchCarDefinitions();
        fetchCTA();
        fetchAboutData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (field, value) => {
        setStoryData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        const keysToSave = [
            'sub_label', 'headline', 'founder_text1', 'founder_text2',
            'stat1_desc', 'stat2_desc', 'mission_title', 'mission_desc',
            'vision_title', 'vision_desc'
        ];

        for (const keyName of keysToSave) {
            const currentKey = `story_v2.${keyName}`;
            const currentText = storyData[`${keyName}_${lang}`] || '';

            const { data: existing } = await supabase.from('story_v2').select('key').eq('key', currentKey).single();

            if (existing) {
                await supabase.from('story_v2').update({ [lang]: currentText }).eq('key', currentKey);
            } else {
                await supabase.from('story_v2').insert({ key: currentKey, [lang]: currentText });
            }
        }

        alert(`About Us Content Saved Successfully! ✅`);
        fetchAboutData(); 
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
                    <button onClick={() => setLang('en')} className={`admin-tab-item ${lang === 'en' ? 'is-active' : ''}`}>EN</button>
                    <button onClick={() => setLang('ar')} className={`admin-tab-item ${lang === 'ar' ? 'is-active' : ''}`}>AR</button>
                </div>
            </div>

            <div className="admin-tabs-list">
                <Link to="/website"><button className={`admin-tab-item ${isActive('/website') ? 'is-active' : ''}`}>Home Page</button></Link>
                <Link to="/aboutwebsite"><button className={`admin-tab-item ${isActive('/aboutwebsite') ? 'is-active' : ''}`}>About Us</button></Link>
                <Link to="/contactwebsite"><button className={`admin-tab-item ${isActive('/contactwebsite') ? 'is-active' : ''}`}>Contact</button></Link>
                <Link to="/soldwebsite"><button className={`admin-tab-item ${isActive('/soldwebsite') ? 'is-active' : ''}`}>Most Sold</button></Link>
                <Link to="/admin/dashboard/services"><button className={`admin-tab-item ${isActive('/admin/dashboard/services') ? 'is-active' : ''}`}>Services</button></Link>
                <button className="admin-tab-add-btn">Add Page +</button>
            </div>

            <div className="tab-content-panel" style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#aaa', margin: 0 }}>About Us Page Content Management</p>
                </div>

                <NavManager />

                
                <div style={{ display: 'none' }}>
                    <span>{content.title_en}</span>
                    <span>{newDef.make_en}</span>
                    <button onClick={() => setNewDef({ make_en: '', make_ar: '', model_en: '', model_ar: '' })}></button>
                    <span>{ctaContent.length}</span>
                </div>

                {loading ? (
                    <p style={{ color: '#fff' }}>Processing Data...</p>
                ) : (
                    <div className="admin-form-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        <div style={{ background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                            <h3 style={{ color: '#e50914', marginBottom: '15px' }}>1. Main Story & Introduction</h3>
                            
                            <label style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>Sub Label ({lang.toUpperCase()})</label>
                            <input 
                                type="text" 
                                className="admin-input-field"
                                style={{ width: '100%', marginBottom: '15px', padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                value={storyData[`sub_label_${lang}`] || ''} 
                                onChange={(e) => handleInputChange('sub_label', e.target.value)}
                            />

                            <label style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>Main Headline ({lang.toUpperCase()})</label>
                            <input 
                                type="text" 
                                className="admin-input-field"
                                style={{ width: '100%', marginBottom: '15px', padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                value={storyData[`headline_${lang}`] || ''} 
                                onChange={(e) => handleInputChange('headline', e.target.value)}
                            />

                            <label style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>Founder Paragraph 1 ({lang.toUpperCase()})</label>
                            <textarea 
                                rows="3"
                                style={{ width: '100%', marginBottom: '15px', padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px', resize: 'vertical' }}
                                value={storyData[`founder_text1_${lang}`] || ''} 
                                onChange={(e) => handleInputChange('founder_text1', e.target.value)}
                            />

                            <label style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>Founder Paragraph 2 ({lang.toUpperCase()})</label>
                            <textarea 
                                rows="3"
                                style={{ width: '100%', marginBottom: '15px', padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px', resize: 'vertical' }}
                                value={storyData[`founder_text2_${lang}`] || ''} 
                                onChange={(e) => handleInputChange('founder_text2', e.target.value)}
                            />
                        </div>

                        <div style={{ background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                            <h3 style={{ color: '#e50914', marginBottom: '15px' }}>2. Statistics Labels</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>Stat 1 (50k+) Description ({lang.toUpperCase()})</label>
                                    <input 
                                        type="text" 
                                        style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                        value={storyData[`stat1_desc_${lang}`] || ''} 
                                        onChange={(e) => handleInputChange('stat1_desc', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>Stat 2 (30+) Description ({lang.toUpperCase()})</label>
                                    <input 
                                        type="text" 
                                        style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                        value={storyData[`stat2_desc_${lang}`] || ''} 
                                        onChange={(e) => handleInputChange('stat2_desc', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                            <h3 style={{ color: '#e50914', marginBottom: '15px' }}>3. Mission & Vision Cards</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '6px' }}>
                                    <h4 style={{ color: '#fff', marginBottom: '10px' }}>Our Mission</h4>
                                    <input 
                                        type="text" 
                                        placeholder="Title"
                                        style={{ width: '100%', marginBottom: '10px', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                        value={storyData[`mission_title_${lang}`] || ''} 
                                        onChange={(e) => handleInputChange('mission_title', e.target.value)}
                                    />
                                    <textarea 
                                        rows="3"
                                        placeholder="Description"
                                        style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                        value={storyData[`mission_desc_${lang}`] || ''} 
                                        onChange={(e) => handleInputChange('mission_desc', e.target.value)}
                                    />
                                </div>

                                <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '6px' }}>
                                    <h4 style={{ color: '#fff', marginBottom: '10px' }}>Our Vision</h4>
                                    <input 
                                        type="text" 
                                        placeholder="Title"
                                        style={{ width: '100%', marginBottom: '10px', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                        value={storyData[`vision_title_${lang}`] || ''} 
                                        onChange={(e) => handleInputChange('vision_title', e.target.value)}
                                    />
                                    <textarea 
                                        rows="3"
                                        placeholder="Description"
                                        style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                        value={storyData[`vision_desc_${lang}`] || ''} 
                                        onChange={(e) => handleInputChange('vision_desc', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleSaveChanges}
                            style={{ padding: '15px', background: '#e50914', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: '0.3s' }}
                            onMouseOver={(e) => e.target.style.background = '#b80710'}
                            onMouseOut={(e) => e.target.style.background = '#e31b23'}
                        >
                            Save Content Data
                        </button>

                    </div>
                )}
            </div>

            <ReviewsManager />
            <FooterManager />

        </div>
    );
};

export default AboutWebPage;