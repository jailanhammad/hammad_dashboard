import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './exploreapp.css'; 

const MostSoldManager = ({ lang }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const isAr = lang === 'ar';

  const initialForm = {
    name_en: '', name_ar: '',
    type_tag_en: '', type_tag_ar: '',
    year: '',
    specs_en: '', specs_ar: '',
    price_en: '', price_ar: '',
    monthly_price_en: '', monthly_price_ar: '',
    image_url: '',
    display_order: 1
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchCars(); }, []);

  const fetchCars = async () => {
    const { data } = await supabase
      .from('most_sold_cars')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setCars(data);
  };

  const handleDelete = async (id) => {
    const confirmMsg = isAr ? 'حذف هذه السيارة من الأكثر مبيعاً؟' : 'Delete from Most Sold?';
    if (window.confirm(confirmMsg)) {
      await supabase.from('most_sold_cars').delete().eq('id', id);
      fetchCars();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingId) {
      await supabase.from('most_sold_cars').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('most_sold_cars').insert([formData]);
    }
    
    setFormData(initialForm);
    fetchCars();
    setLoading(false);
  };

  const handleEdit = (car) => {
    setEditingId(car.id);
    setFormData(car);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="manage-container" dir={isAr ? 'rtl' : 'ltr'}>
      <h2 className="section-title">{isAr ? 'إدارة الأكثر مبيعاً' : 'Manage Most Sold'}</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">

          <input 
            type="text" 
            placeholder={isAr ? 'اسم السيارة' : 'Car Name'} 
            value={isAr ? formData.name_ar : formData.name_en} 
            onChange={(e) => setFormData(isAr ? {...formData, name_ar: e.target.value} : {...formData, name_en: e.target.value})} 
            required 
          />
          
          <input 
            type="text" 
            placeholder={isAr ? 'النوع (سيدان/SUV)' : 'Type (Sedan/SUV)'} 
            value={isAr ? formData.type_tag_ar : formData.type_tag_en} 
            onChange={(e) => setFormData(isAr ? {...formData, type_tag_ar: e.target.value} : {...formData, type_tag_en: e.target.value})} 
          />

          <input type="text" placeholder={isAr ? 'السنة' : 'Year'} value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
          <input type="number" placeholder={isAr ? 'الترتيب' : 'Order'} value={formData.display_order} onChange={(e) => setFormData({...formData, display_order: e.target.value})} />
          
          <input 
            type="text" 
            placeholder={isAr ? 'المواصفات' : 'Specs'} 
            value={isAr ? formData.specs_ar : formData.specs_en} 
            onChange={(e) => setFormData(isAr ? {...formData, specs_ar: e.target.value} : {...formData, specs_en: e.target.value})} 
            className="full-width" 
          />

          <input 
            type="text" 
            placeholder={isAr ? 'السعر' : 'Price'} 
            value={isAr ? formData.price_ar : formData.price_en} 
            onChange={(e) => setFormData(isAr ? {...formData, price_ar: e.target.value} : {...formData, price_en: e.target.value})} 
          />
          
          <input 
            type="text" 
            placeholder={isAr ? 'السعر القديم / من كذا' : 'Old / From Price'} 
            value={isAr ? formData.monthly_price_ar : formData.monthly_price_en} 
            onChange={(e) => setFormData(isAr ? {...formData, monthly_price_ar: e.target.value} : {...formData, monthly_price_en: e.target.value})} 
          />

          <input type="text" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="full-width" />
        </div>

        <button type="submit" className="add-btn">
          {loading ? '...' : (editingId ? (isAr ? 'تحديث' : 'Update') : (isAr ? 'إضافة' : 'Add'))}
        </button>
      </form>

      <div className="items-list">
        {cars.map(car => (
          <div key={car.id} className="item-row">
            <img src={car.image_url} alt="" className="item-thumb" />
            <div className="item-info">
              <p><strong>{isAr ? car.name_ar : car.name_en}</strong></p>
              <p className="price-tag">{isAr ? car.price_ar : car.price_en} EGP</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(car)} className="edit-btn">{isAr ? 'تعديل' : 'Edit'}</button>
              <button onClick={() => handleDelete(car.id)} className="delete-btn">{isAr ? 'حذف' : 'Delete'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSoldManager;