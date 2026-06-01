import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './exploreapp.css'; 

const AboutManager = ({ lang }) => {
  const isAr = lang === 'ar';
  const [loading, setLoading] = useState(false);
  const [aboutList, setAboutList] = useState([]); 
  const [editingId, setEditingId] = useState(null); 

  const initialForm = {
    founder_name_en: '', founder_name_ar: '',
    founder_description_en: '', founder_description_ar: '',
    mission_title_en: 'The Mission', mission_title_ar: 'الرسالة',
    mission_desc_en: '', mission_desc_ar: '',
    vision_title_en: 'The Vision', vision_title_ar: 'الرؤية',
    vision_desc_en: '', vision_desc_ar: ''
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchAboutData(); }, []);

  const fetchAboutData = async () => {
    const { data } = await supabase.from('app_aboutus').select('*');
    if (data) setAboutList(data);
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setFormData(item); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      await supabase.from('app_aboutus').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('app_aboutus').insert([formData]);
    }

    setFormData(initialForm);
    fetchAboutData();
    setLoading(false);
    alert(isAr ? 'تم الحفظ بنجاح!' : 'Saved successfully!');
  };

  return (
    <div className="manage-container" dir={isAr ? 'rtl' : 'ltr'}>
      <h2 className="section-title">{isAr ? 'إدارة صفحة من نحن' : 'Manage About Us'}</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">

          <h3 className="full-width">{isAr ? 'بيانات المؤسس' : 'Founder Details'}</h3>
          <input 
            type="text" 
            placeholder={isAr ? 'اسم المؤسس' : 'Founder Name'} 
            value={isAr ? formData.founder_name_ar : formData.founder_name_en} 
            onChange={(e) => setFormData(isAr ? {...formData, founder_name_ar: e.target.value} : {...formData, founder_name_en: e.target.value})} 
          />
          <textarea 
            className="full-width"
            placeholder={isAr ? 'وصف المؤسس' : 'Founder Bio'} 
            value={isAr ? formData.founder_description_ar : formData.founder_description_en} 
            onChange={(e) => setFormData(isAr ? {...formData, founder_description_ar: e.target.value} : {...formData, founder_description_en: e.target.value})}
          />

          <h3 className="full-width">{isAr ? 'الرسالة' : 'The Mission'}</h3>
          <textarea 
            className="full-width"
            placeholder={isAr ? 'نص الرسالة' : 'Mission Description'} 
            value={isAr ? formData.mission_desc_ar : formData.mission_desc_en} 
            onChange={(e) => setFormData(isAr ? {...formData, mission_desc_ar: e.target.value} : {...formData, mission_desc_en: e.target.value})}
          />

          <h3 className="full-width">{isAr ? 'الرؤية' : 'The Vision'}</h3>
          <textarea 
            className="full-width"
            placeholder={isAr ? 'نص الرؤية' : 'Vision Description'} 
            value={isAr ? formData.vision_desc_ar : formData.vision_desc_en} 
            onChange={(e) => setFormData(isAr ? {...formData, vision_desc_ar: e.target.value} : {...formData, vision_desc_en: e.target.value})}
          />
        </div>

        <button type="submit" className="add-btn">
          {loading ? '...' : (editingId ? (isAr ? 'تعديل البيانات' : 'Update Content') : (isAr ? 'إضافة جديد' : 'Add New'))}
        </button>
      </form>

      <div className="items-list">
        {aboutList.map((item) => (
          <div key={item.id} className="item-row">
            <div className="item-info">
              <p><strong>{isAr ? item.founder_name_ar : item.founder_name_en}</strong></p>
              <p style={{fontSize: '12px', opacity: 0.7}}>
                {isAr ? 'الرسالة: ' + item.mission_desc_ar.substring(0, 30) : 'Mission: ' + item.mission_desc_en.substring(0, 30)}...
              </p>
            </div>
            <div className="actions">
              <button onClick={() => handleEditClick(item)} className="edit-btn">
                {isAr ? 'تعديل' : 'Edit'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutManager;