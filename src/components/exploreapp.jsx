import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './exploreapp.css'; 

const ExploreManager = ({ lang }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const isAr = lang === 'ar';

  const initialForm = {
    name_en: '', name_ar: '',
    type_tag_en: '', type_tag_ar: '',
    year: '',
    specs_en: '', specs_ar: '',
    main_price_en: '', main_price_ar: '',
    monthly_price_en: '', monthly_price_ar: '',
    image_url: '',
    display_order: 1
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchCars(); }, []);

  const fetchCars = async () => {
    const { data } = await supabase
      .from('explore_cars')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setCars(data);
  };

  const handleDelete = async (id) => {
    const confirmMsg = isAr ? 'هل أنت متأكد من حذف هذه السيارة؟' : 'Are you sure you want to delete this car?';
    if (window.confirm(confirmMsg)) {
      const { error } = await supabase
        .from('explore_cars')
        .delete()
        .eq('id', id);
      
      if (!error) {
        fetchCars(); 
      } else {
        alert(isAr ? 'حدث خطأ أثناء الحذف' : 'Error deleting car');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingId) {
      await supabase.from('explore_cars').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('explore_cars').insert([formData]);
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
      <h2 className="section-title-manage">{isAr ? 'إدارة السيارات' : 'Manage Vehicles'}</h2>
      
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
            value={isAr ? formData.main_price_ar : formData.main_price_en} 
            onChange={(e) => setFormData(isAr ? {...formData, main_price_ar: e.target.value} : {...formData, main_price_en: e.target.value})} 
          />
          
          <input 
            type="text" 
            placeholder={isAr ? 'السعر القديم / شهري' : 'Old / Monthly Price'} 
            value={isAr ? formData.monthly_price_ar : formData.monthly_price_en} 
            onChange={(e) => setFormData(isAr ? {...formData, monthly_price_ar: e.target.value} : {...formData, monthly_price_en: e.target.value})} 
          />

          <input type="text" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="full-width" />
        </div>

        <button type="submit" className="add-btn">
          {loading ? '...' : (editingId ? (isAr ? 'تحديث السيارة' : 'Update Vehicle') : (isAr ? 'إضافة سيارة' : 'Add Vehicle'))}
        </button>
      </form>

      <div className="items-list">
        {cars.map(car => (
          <div key={car.id} className="item-row">
            <img src={car.image_url} alt="" className="item-thumb" />
            <div className="item-info">
              <p><strong>{isAr ? car.name_ar : car.name_en}</strong></p>
              <p className="price-tag">{isAr ? car.main_price_ar : car.main_price_en} EGP</p>
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

export default ExploreManager;