import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './exploreapp.css'; 

const VehicleAppManager = ({ lang }) => {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const isAr = lang === 'ar';

  const initialForm = {
    name_en: '', name_ar: '',
    brand_en: '', brand_ar: '',
    engine_en: '', engine_ar: '',
    transmission_en: '', transmission_ar: '',
    fuel_type_en: 'gasoline', fuel_type_ar: 'بنزين',
    category_name_en: 'Sedan', category_name_ar: 'سيدان',
    category_en: '', category_ar: '',
    price_usd: '',
    image_url: '',
    is_favorite: false
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { 
    fetchVehicles();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('vehicle_categories_2').select('*').order('display_order', { ascending: true });
    if (data) setCategories(data);
  };

  const fetchVehicles = async () => {
    const { data } = await supabase.from('vehicles_data_2').select('*').order('created_at', { ascending: false });
    if (data) setVehicles(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await supabase.from('vehicles_data_2').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('vehicles_data_2').insert([formData]);
    }
    setFormData(initialForm);
    fetchVehicles();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm(isAr ? 'حذف هذه السيارة؟' : 'Delete this vehicle?')) {
      await supabase.from('vehicles_data_2').delete().eq('id', id);
      fetchVehicles();
    }
  };

  return (
    <div className="manage-container" dir={isAr ? 'rtl' : 'ltr'}>
      <h2 className="section-title">{isAr ? 'إدارة أسطول السيارات' : 'Manage Vehicle Fleet'}</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">

          <input type="text" placeholder={isAr ? 'اسم السيارة (مثلاً: مرسيدس C180)' : 'Vehicle Name'} 
            value={isAr ? formData.name_ar : formData.name_en} 
            onChange={(e) => setFormData(isAr ? {...formData, name_ar: e.target.value} : {...formData, name_en: e.target.value})} required />
          
          <input type="text" placeholder={isAr ? 'الماركة' : 'Brand'} 
            value={isAr ? formData.brand_ar : formData.brand_en} 
            onChange={(e) => setFormData(isAr ? {...formData, brand_ar: e.target.value} : {...formData, brand_en: e.target.value})} />

          <input type="number" placeholder={isAr ? 'السعر (EGP)' : 'Price (EGP)'} value={formData.price_usd} 
            onChange={(e) => setFormData({...formData, price_usd: e.target.value})} />
          
          <input type="text" placeholder={isAr ? 'المسافة المقطوعة (مثلاً: ٢٠ ألف كم)' : 'Engine/Mileage'} 
            value={isAr ? formData.engine_ar : formData.engine_en} 
            onChange={(e) => setFormData(isAr ? {...formData, engine_ar: e.target.value} : {...formData, engine_en: e.target.value})} />

          <select 
            value={formData.category_name_en} 
            onChange={(e) => {
                const selectedCat = categories.find(c => c.name_en === e.target.value);
                setFormData({...formData, category_name_en: e.target.value, category_name_ar: selectedCat?.name_ar});
            }}>
            {categories.filter(c => c.slug !== 'all').map(cat => (
              <option key={cat.id} value={cat.name_en}>{isAr ? cat.name_ar : cat.name_en}</option>
            ))}
          </select>

          <input type="text" placeholder="Image URL" value={formData.image_url} 
            onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
        </div>

        <button type="submit" className="add-btn">
          {loading ? '...' : (editingId ? (isAr ? 'تحديث البيانات' : 'Update Vehicle') : (isAr ? 'إضافة سيارة' : 'Add Vehicle'))}
        </button>
      </form>

      <div className="items-list">
        {vehicles.map(car => (
          <div key={car.id} className="item-row">
            <img src={car.image_url} alt="" className="item-thumb" />
            <div className="item-info">
              <p><strong>{isAr ? car.name_ar : car.name_en}</strong></p>
              <p className="price-tag">{car.price_usd?.toLocaleString()} EGP</p>
            </div>
            <div className="actions">
              <button onClick={() => {setEditingId(car.id); setFormData(car);}} className="edit-btn">{isAr ? 'تعديل' : 'Edit'}</button>
              <button onClick={() => handleDelete(car.id)} className="delete-btn">{isAr ? 'حذف' : 'Delete'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleAppManager;