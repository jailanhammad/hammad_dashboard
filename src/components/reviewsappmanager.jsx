import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './exploreapp.css'; 

const ReviewsAppManager = ({ lang }) => {
  const isAr = lang === 'ar';
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('hammad_reviews')
      .select('*')
      .order('created_at', { ascending: false }); 

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(isAr ? 'هل أنت متأكد من حذف هذا التقييم؟' : 'Are you sure you want to delete this review?');
    
    if (confirmDelete) {
      const { error } = await supabase
        .from('hammad_reviews')
        .delete()
        .eq('id', id);

      if (!error) {

        setReviews(reviews.filter(review => review.id !== id));
        alert(isAr ? 'تم الحذف بنجاح' : 'Deleted successfully');
      } else {
        alert(isAr ? 'حدث خطأ أثناء الحذف' : 'Error deleting review');
      }
    }
  };

  return (
    <div className="manage-container" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="contact-header">
        <h2 className="section-title">
          {isAr ? 'إدارة تقييمات العملاء' : 'Manage Customer Reviews'}
        </h2>
        <div className="line-divider"></div>
      </div>

      <div className="items-list" style={{ marginTop: '20px' }}>
        {loading ? (
          <p>{isAr ? 'جاري التحميل...' : 'Loading reviews...'}</p>
        ) : reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="item-row">
              <div className="item-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <strong>{rev.user_name}</strong>
                  <span style={{ color: '#ffc107' }}>
                    {"★".repeat(rev.rating)}
                    <span style={{ color: '#444' }}>{"★".repeat(5 - rev.rating)}</span>
                  </span>
                </div>
                <p style={{ marginTop: '5px', color: '#ccc', fontSize: '14px' }}>
                  {rev.comment}
                </p>
                <small style={{ color: '#666', fontSize: '11px' }}>
                  {new Date(rev.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
                </small>
              </div>

              <div className="actions">
                <button 
                  onClick={() => deleteReview(rev.id)} 
                  className="delete-btn"
                  style={{ minWidth: '80px' }}
                >
                  {isAr ? 'حذف' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>{isAr ? 'لا توجد تقييمات حالياً' : 'No reviews found'}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsAppManager;