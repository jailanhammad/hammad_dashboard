import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './exploreapp.css';

const ReviewManager = ({ lang }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const isAr = lang === 'ar';

  const initialForm = {
    user_name_en: '', user_name_ar: '',
    user_avatar: '',
    is_verified: true,
    rating: 5,
    date_text_en: '', date_text_ar: '',
    comment_en: '', comment_ar: '',
    display_order: 0
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('customer_reviews_2')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setReviews(data);
  };

  const handleDelete = async (id) => {
    const confirmMsg = isAr ? 'حذف هذا التقييم؟' : 'Delete this review?';
    if (window.confirm(confirmMsg)) {
      await supabase.from('customer_reviews_2').delete().eq('id', id);
      fetchReviews();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingId) {
      await supabase.from('customer_reviews_2').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('customer_reviews_2').insert([formData]);
    }
    
    setFormData(initialForm);
    fetchReviews();
    setLoading(false);
  };

  const handleEdit = (rev) => {
    setEditingId(rev.id);
    setFormData(rev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="manage-container" dir={isAr ? 'rtl' : 'ltr'}>
      <h2 className="section-title">{isAr ? 'إدارة آراء العملاء' : 'Manage Customer Reviews'}</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">
          {/* اسم العميل */}
          <input 
            type="text" 
            placeholder={isAr ? 'اسم العميل' : 'Customer Name'} 
            value={isAr ? formData.user_name_ar : formData.user_name_en} 
            onChange={(e) => setFormData(isAr ? {...formData, user_name_ar: e.target.value} : {...formData, user_name_en: e.target.value})} 
            required 
          />
          
          <input 
            type="text" 
            placeholder={isAr ? 'تاريخ التقييم (مثلاً: منذ يومين)' : 'Date Text (e.g. 2 days ago)'} 
            value={isAr ? formData.date_text_ar : formData.date_text_en} 
            onChange={(e) => setFormData(isAr ? {...formData, date_text_ar: e.target.value} : {...formData, date_text_en: e.target.value})} 
          />

          <input type="number" min="1" max="5" placeholder={isAr ? 'التقييم (1-5)' : 'Rating (1-5)'} value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} />
          <input type="number" placeholder={isAr ? 'الترتيب' : 'Order'} value={formData.display_order} onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})} />
          
          <textarea 
            placeholder={isAr ? 'التعليق' : 'Comment'} 
            value={isAr ? formData.comment_ar : formData.comment_en} 
            onChange={(e) => setFormData(isAr ? {...formData, comment_ar: e.target.value} : {...formData, comment_en: e.target.value})} 
            className="full-width"
            style={{background: '#2c2c2c', color: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #3d3d3d'}}
          />

          <input type="text" placeholder="Avatar URL (Image)" value={formData.user_avatar} onChange={(e) => setFormData({...formData, user_avatar: e.target.value})} className="full-width" />
        </div>

        <button type="submit" className="add-btn">
          {loading ? '...' : (editingId ? (isAr ? 'تحديث التقييم' : 'Update Review') : (isAr ? 'إضافة تقييم' : 'Add Review'))}
        </button>
      </form>

      <div className="items-list">
        {reviews.map(rev => (
          <div key={rev.id} className="item-row">
            <img src={rev.user_avatar} alt="" className="item-thumb" style={{borderRadius: '50%'}} />
            <div className="item-info">
              <p><strong>{isAr ? rev.user_name_ar : rev.user_name_en}</strong></p>
              <p className="price-tag">{'⭐'.repeat(rev.rating)}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(rev)} className="edit-btn">{isAr ? 'تعديل' : 'Edit'}</button>
              <button onClick={() => handleDelete(rev.id)} className="delete-btn">{isAr ? 'حذف' : 'Delete'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManager;