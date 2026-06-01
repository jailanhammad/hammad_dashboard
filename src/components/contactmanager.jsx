import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './exploreapp.css'; 

const ContactManager = ({ lang }) => {
  const isAr = lang === 'ar';
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  
  const [info, setInfo] = useState({ 
    id: '', 
    phone: '', 
    email: '', 
    address_en: '', 
    address_ar: '' 
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const { data: contactData } = await supabase.from('app_contact_info').select('*').maybeSingle();
    if (contactData) setInfo(contactData);

    const { data: msgData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (msgData) setMessages(msgData);
  };

  const handleUpdateContactInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase
      .from('app_contact_info')
      .update({
        phone: info.phone,
        email: info.email,
        address_en: info.address_en,
        address_ar: info.address_ar
      })
      .eq('id', info.id); 

    if (!error) {
      alert(isAr ? 'تم تحديث بيانات التواصل بنجاح!' : 'Contact Info Updated!');
    } else {
      alert(isAr ? 'حدث خطأ أثناء التحديث' : 'Update Failed');
    }
    setLoading(false);
  };

  const deleteMessage = async (id) => {
    if(window.confirm(isAr ? 'متأكد من حذف الرسالة؟' : 'Delete message?')) {
      await supabase.from('contact_messages').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="manage-container" dir={isAr ? 'rtl' : 'ltr'}>
      <h2 className="section-title">{isAr ? 'تعديل بيانات التواصل' : 'Edit Contact Info'}</h2>
      
      <form onSubmit={handleUpdateContactInfo} className="admin-form">
        <div className="form-grid">
          <div className="input-group">
            <label>{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
            <input 
              type="text" 
              value={info.phone} 
              onChange={(e) => setInfo({...info, phone: e.target.value})} 
              placeholder="+20..."
            />
          </div>
          <div className="input-group">
            <label>{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
            <input 
              type="email" 
              value={info.email} 
              onChange={(e) => setInfo({...info, email: e.target.value})} 
              placeholder="example@mail.com"
            />
          </div>
          <div className="input-group full-width">
            <label>{isAr ? 'العنوان (بالإنجليزي)' : 'Address (English)'}</label>
            <textarea 
              value={info.address_en} 
              onChange={(e) => setInfo({...info, address_en: e.target.value})} 
            />
          </div>
          <div className="input-group full-width">
            <label>{isAr ? 'العنوان (بالعربي)' : 'العنوان (عربي)'}</label>
            <textarea 
              value={info.address_ar} 
              onChange={(e) => setInfo({...info, address_ar: e.target.value})} 
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          {loading ? '...' : (isAr ? 'حفظ التعديلات' : 'Save Changes')}
        </button>
      </form>

      <h2 className="section-title" style={{marginTop: '40px'}}>{isAr ? 'رسائل العملاء' : 'Customer Messages'}</h2>
      
      <div className="items-list">
        {messages.map((msg) => (
          <div key={msg.id} className="item-row">
            <div className="item-info">
              <p><strong>{msg.full_name}</strong></p>
              <p style={{fontSize: '13px', color: '#bbb'}}>{msg.message}</p>
            </div>
            <div className="actions">
              <button onClick={() => deleteMessage(msg.id)} className="delete-btn">
                {isAr ? 'حذف' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactManager;