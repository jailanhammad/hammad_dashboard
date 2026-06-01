import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './exploreapp.css';

const BrandManager = ({ lang }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const isAr = lang === 'ar';

  const initialForm = {
    name_en: '', 
    name_ar: '',
    logo_url: '',
    vehicle_count: 0
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchBrands(); }, []);

  const fetchBrands = async () => {
    const { data } = await supabase
      .from('app_brands')
      .select('*')
      .order('name_en', { ascending: true });
    if (data) setBrands(data);
  };

  const handleDelete = async (id) => {
    const confirmMsg = isAr ? 'هل تريد حذف هذه الماركة؟' : 'Delete this brand?';
    if (window.confirm(confirmMsg)) {
      await supabase.from('app_brands').delete().eq('id', id);
      fetchBrands();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingId) {
      await supabase.from('app_brands').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('app_brands').insert([formData]);
    }
    
    setFormData(initialForm);
    fetchBrands();
    setLoading(false);
  };

  const handleEdit = (brand) => {
    setEditingId(brand.id);
    setFormData(brand);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="manage-container" dir={isAr ? 'rtl' : 'ltr'}>
      <h2 className="section-title">{isAr ? 'إدارة الماركات' : 'Manage Brands'}</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">

          <input 
            type="text" 
            placeholder={isAr ? 'اسم الماركة' : 'Brand Name'} 
            value={isAr ? formData.name_ar : formData.name_en} 
            onChange={(e) => setFormData(isAr ? {...formData, name_ar: e.target.value} : {...formData, name_en: e.target.value})} 
            required 
          />
          
          <input 
            type="number" 
            placeholder={isAr ? 'عدد السيارات' : 'Vehicle Count'} 
            value={formData.vehicle_count} 
            onChange={(e) => setFormData({...formData, vehicle_count: parseInt(e.target.value)})} 
          />

          <input 
            type="text" 
            placeholder="Logo URL (SVG/PNG)" 
            value={formData.logo_url} 
            onChange={(e) => setFormData({...formData, logo_url: e.target.value})} 
            className="full-width" 
          />
        </div>

        <button type="submit" className="add-btn">
          {loading ? '...' : (editingId ? (isAr ? 'تحديث الماركة' : 'Update Brand') : (isAr ? 'إضافة ماركة' : 'Add Brand'))}
        </button>
      </form>

      <div className="items-list">
        {brands.map(brand => (
          <div key={brand.id} className="item-row">
            <div style={{background: '#fff', padding: '5px', borderRadius: '5px', display: 'flex'}}>
                <img src={brand.logo_url} alt="" className="item-thumb" style={{objectFit: 'contain', width: '40px'}} />
            </div>
            <div className="item-info">
              <p><strong>{isAr ? brand.name_ar : brand.name_en}</strong></p>
              <p className="price-tag">{brand.vehicle_count} {isAr ? 'سيارة' : 'vehicles'}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(brand)} className="edit-btn">{isAr ? 'تعديل' : 'Edit'}</button>
              <button onClick={() => handleDelete(brand.id)} className="delete-btn">{isAr ? 'حذف' : 'Delete'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandManager;