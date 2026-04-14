import React, { useState, useEffect } from 'react';
import './webmanagement.css';
import { supabase } from '../supabase'; 

const WebManagement = () => {
    const [loading, setLoading] = useState(false);
    const [lang, setLang] = useState('en'); 
    const [content, setContent] = useState({
        title_en: '',
        title_ar: '',
        description_en: '',
        description_ar: '',
        image_url: ''
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        const { data, error } = await supabase
            .from('website_sections')
            .select('*')
            .eq('section_key', 'hero_section')
            .single(); 

        if (data) {
            setContent({
                title_en: data.title_en || '',
                title_ar: data.title_ar || '',
                description_en: data.description_en || '',
                description_ar: data.description_ar || '',
                image_url: data.image_url || ''
            });
        }
        if (error) console.error('Error fetching data:', error);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `hero_${Date.now()}.${fileExt}`;
        const filePath = `hero-images/${fileName}`;

        let { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading image!');
            setLoading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        const { error: updateError } = await supabase
            .from('website_sections')
            .update({ image_url: publicUrl })
            .eq('section_key', 'hero_section');

        if (!updateError) {
            setContent({ ...content, image_url: publicUrl });
            alert('Image uploaded and saved! ✅');
        }
        setLoading(false);
    };

    const handleDeleteImage = async () => {
        if (!window.confirm("Are you sure you want to remove the image?")) return;
        
        setLoading(true);
        const { error } = await supabase
            .from('website_sections')
            .update({ image_url: null })
            .eq('section_key', 'hero_section');

        if (!error) {
            setContent({ ...content, image_url: '' });
            alert('Image removed! 🗑️');
        }
        setLoading(false);
    };

    const handleSaveStrings = async () => {
        setLoading(true);
        const { error } = await supabase
            .from('website_sections')
            .update({
                title_en: content.title_en,
                title_ar: content.title_ar,
                description_en: content.description_en,
                description_ar: content.description_ar,
            })
            .eq('section_key', 'hero_section'); 

        if (!error) {
            alert('Text updated successfully! ✅');
        } else {
            alert('Error saving data! ❌');
        }
        setLoading(false);
    };


const fetchCarDefinitions = async () => {
    const { data } = await supabase.from('car_definitions').select('*');
    if (data) setCarDefs(data);
};

const addDefinition = async () => {
    if (!newDef.make_en || !newDef.model_en) return alert("Please fill at least English fields");
    
    const { error } = await supabase.from('car_definitions').insert([newDef]);
    
    if (!error) {
        fetchCarDefinitions(); 
        setNewDef({ make_en: '', make_ar: '', model_en: '', model_ar: '' }); 
        alert("New Brand/Model Added! 🚗");
    } else {
        alert(error.message);
    }
};

const deleteDefinition = async (id) => {
    if (window.confirm("Delete this definition?")) {
        const { error } = await supabase.from('car_definitions').delete().eq('id', id);
        if (!error) fetchCarDefinitions();
    }
};

useEffect(() => {
    fetchContent();
    fetchCarDefinitions(); 
}, []);


const [carDefs, setCarDefs] = useState([]);

const [newDef, setNewDef] = useState({ 
    make_en: '', 
    make_ar: '', 
    model_en: '', 
    model_ar: '' 
});


const [ctaContent, setCtaContent] = useState([]);

const fetchCTA = async () => {
    const { data } = await supabase.from('home_cta_sections').select('*').order('type', { ascending: true });
    if (data) setCtaContent(data);
};

const updateCtaCard = async (index) => {
    const card = ctaContent[index];
    const { error } = await supabase.from('home_cta_sections').update(card).eq('id', card.id);
    if (!error) alert('Updated Successfully');
};

useEffect(() => {
    fetchContent();
    fetchCarDefinitions();
    fetchCTA();
}, []);


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
                {['Home Page', 'About Us', 'Contact', 'Gallery', 'Services'].map((tab) => (
                    <button key={tab} className={`admin-tab-item ${tab === 'Home Page' ? 'is-active' : ''}`}>{tab}</button>
                ))}
                <button className="admin-tab-add-btn">Add Page +</button>
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
                            value={lang === 'en' ? content.title_en : content.title_ar}
                            onChange={(e) => setContent({
                                ...content, 
                                [lang === 'en' ? 'title_en' : 'title_ar']: e.target.value
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
                            value={lang === 'en' ? content.description_en : content.description_ar}
                            onChange={(e) => setContent({
                                ...content, 
                                [lang === 'en' ? 'description_en' : 'description_ar']: e.target.value
                            })}
                            placeholder="Enter description here..."
                        />
                    </div>
                </div>

                <div className="admin-field-container">
                    <label className="admin-field-label">Hero Background Image</label>
                    
                    {content.image_url ? (
                        <div className="admin-image-preview" style={{ position: 'relative', width: 'fit-content' }}>
                            <img src={content.image_url} alt="Hero BG" style={{ width: '250px', borderRadius: '12px', border: '1px solid #333' }} />
                            <button 
                                onClick={handleDeleteImage}
                                style={{ position: 'absolute', left: '100px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '5px 40px' }}
                            >
                                Delete 
                            </button>
                        </div>
                    ) : (
                        <div className="admin-upload-dropzone" style={{ position: 'relative' }}>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            />
                            <div style={{ fontSize: '30px', marginBottom: '10px' }}>🖼️</div>
                            <p>{loading ? 'Processing...' : 'Click to upload Hero Image'}</p>
                        </div>
                    )}
                </div>

                <div className="admin-btn-group">
                    <button 
                        onClick={handleSaveStrings}
                        disabled={loading}
                        className="admin-btn-save">
                        {loading ? 'Saving...' : '💾 Save Changes'}
                    </button>
                    <button className="admin-btn-preview">Preview</button>
                </div>
            </div>


<div className="admin-content-card" style={{ marginTop: '30px' }}>
    <h2 className="admin-card-header">2. Search Bar Settings (Makes & Models)</h2>
    
    <div className="admin-input-grid">
        <input 
            placeholder="Make (EN)" 
            value={newDef.make_en} 
            onChange={e => setNewDef({...newDef, make_en: e.target.value})} 
        />
        <input 
            placeholder="Make (AR)" 
            value={newDef.make_ar} 
            onChange={e => setNewDef({...newDef, make_ar: e.target.value})} 
        />
        <input 
            placeholder="Model (EN)" 
            value={newDef.model_en} 
            onChange={e => setNewDef({...newDef, model_en: e.target.value})} 
        />
        <input 
            placeholder="Model (AR)" 
            value={newDef.model_ar} 
            onChange={e => setNewDef({...newDef, model_ar: e.target.value})} 
        />
        <button onClick={addDefinition} className="admin-btn-add">Add +</button>
    </div>

    <div className="admin-table-container">
        <table className="admin-table">
            <thead>
                <tr>
                    <th>Make (EN/AR)</th>
                    <th>Model (EN/AR)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {carDefs.map(def => (
                    <tr key={def.id}>
                        <td>{def.make_en} / {def.make_ar}</td>
                        <td>{def.model_en} / {def.model_ar}</td>
                        <td>
                            <button onClick={() => deleteDefinition(def.id)} className="btn-delete">
                                🗑️
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>


<div className="admin-content-card cta-management-section">
    <h2 className="admin-card-header">3. Home CTA Sections (Buy/Sell)</h2>
    <div className="cta-grid-container">
        {ctaContent.map((cta, index) => (
            <div key={cta.id} className="cta-admin-card">
                <h4 className="cta-card-type">
                    {cta.type === 'buy' ? 'Left Card' : 'Right Card'}
                </h4>
                
                <div className="admin-field-container">
                    <label>Title ({lang.toUpperCase()})</label>
                    <input 
                        className="admin-field-input-box" 
                        value={lang === 'en' ? cta.title_en : cta.title_ar} 
                        onChange={(e) => {
                            const newData = [...ctaContent];
                            newData[index][lang === 'en' ? 'title_en' : 'title_ar'] = e.target.value;
                            setCtaContent(newData);
                        }}
                    />
                </div>

                <div className="admin-field-container">
                    <label>Description ({lang.toUpperCase()})</label>
                    <textarea 
                        className="admin-field-input-box" 
                        rows="3"
                        value={lang === 'en' ? cta.sub_title_en : cta.sub_title_ar} 
                        onChange={(e) => {
                            const newData = [...ctaContent];
                            newData[index][lang === 'en' ? 'sub_title_en' : 'sub_title_ar'] = e.target.value;
                            setCtaContent(newData);
                        }}
                    />
                </div>

                <div className="admin-field-container">
                    <label>Button Link</label>
                    <input 
                        className="admin-field-input-box" 
                        value={cta.btn_link} 
                        onChange={(e) => {
                            const newData = [...ctaContent];
                            newData[index].btn_link = e.target.value;
                            setCtaContent(newData);
                        }}
                    />
                </div>

                <button 
                    onClick={() => updateCtaCard(index)} 
                    className="admin-btn-save cta-update-btn"
                >
                    Update {cta.type === 'buy' ? 'Buy' : 'Sell'} Card
                </button>
            </div>
        ))}
    </div>
</div>



            
        </div>
    );
};

export default WebManagement;