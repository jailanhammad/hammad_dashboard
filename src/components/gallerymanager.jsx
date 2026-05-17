import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './gallerymanager.css';

const GalleryManager = () => {
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const fetchImages = async () => {
        const { data, error } = await supabase
            .from('homepage_gallery')
            .select('*')
            .order('id', { ascending: true });
        
        if (!error && data) setImages(data);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageUrl) return;

        const { error } = await supabase
            .from('homepage_gallery')
            .insert([{ image_url: imageUrl }]);

        if (!error) {
            alert('Image added to gallery successfully!');
            setImageUrl('');
            fetchImages();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            const { error } = await supabase
                .from('homepage_gallery')
                .delete()
                .eq('id', id);
            
            if (!error) fetchImages();
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>6. Gallery (360° Loop)</h2>
                <p>Upload new sequence frames to update the interactive 360 viewer.</p>
            </div>

            <form className="manager-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>IMAGE URL (FRAME SOURCE)</label>
                    <div className="url-input-row" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <input 
                            type="text" 
                            value={imageUrl} 
                            onChange={(e) => setImageUrl(e.target.value)} 
                            required 
                            placeholder="https://supabase.com/dashboard/storage/v1/object/public/..." 
                            style={{ flex: 1 }}
                        />
                        <button type="submit" className="save-btn" style={{ marginTop: 0 }}>
                            Add Image
                        </button>
                    </div>
                </div>
            </form>

            <div className="inventory-section">
                <h3>Active Gallery Frames ({images.length})</h3>
                <div className="gallery-manager-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    {images.map((img, idx) => (
                        <div className="gallery-manager-card" key={img.id} style={{ backgroundColor: '#161616', border: '1px solid #1f1f1f', borderRadius: '12px', overflow: 'hidden' }}>
                            <img src={img.image_url} alt="Frame" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                            <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#131313' }}>
                                <span style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>FRAME #{idx + 1}</span>
                                <button onClick={() => handleDelete(img.id)} style={{ background: 'none', border: 'none', color: '#e31b23', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {images.length === 0 && (
                    <p style={{ color: '#555', textAlign: 'center', padding: '30px', fontSize: '14px' }}>
                        No dynamic frames uploaded. Website is currently using the 10 fallback default assets.
                    </p>
                )}
            </div>
        </div>
    );
};

export default GalleryManager;