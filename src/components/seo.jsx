import React from 'react';
import './seo.css';
import edit from '../assets/home/edit.svg';
import upload from '../assets/home/upload.svg';
import deletee from '../assets/home/delete.svg';


const Seo = () => {
    return ( 
        <>
        
        
        
        <div class="seo-container">
    <h1 class="seo-main-title">SEO & Content Optimization</h1>

    <div class="seo-card">
        <div class="seo-row">
            <div class="seo-group">
                <label for="page-title">Page &lt;title&gt; Tag</label>
                <div class="seo-select-wrapper">
                    <select id="page-title">
                        <option>Category</option>
                    </select>
                </div>
            </div>

            <div class="seo-group">
                <label for="url-name">URL Name</label>
                <div class="seo-input-wrapper">
                    <input type="text" id="url-name" placeholder="Link"/>
                    <span class="icon-placeholder">
                        <img src={edit} alt="edit-icon" className='edit-icon' />
                    </span>
                </div>
            </div>
        </div>

        <div class="seo-group full-width">
            <label for="meta-desc">Meta Description</label>
            <textarea id="meta-desc" rows="4"></textarea>
        </div>

        <div class="seo-group full-width">
            <label>Image Optimization</label>
            <div class="upload-area">
                <span class="upload-icon">
                <img src={upload} alt="edit-icon" className='edit-icon' />
                </span>
                <p>Upload New Image</p>
            </div>
        </div>

        <div class="seo-actions">
            <button class="btn btn-edit-00">
                Edit SEO <span>
                <img src={edit} alt="edit-icon" className='edit-icon' />
                </span>
            </button>
            <button class="btn btn-delete-00">
                Delete SEO <span></span>
                <img src={deletee} alt="edit-icon" className='edit-icon' />
            </button>
        </div>
    </div>
</div>
        
        
        
        
        </>
     );
}
 
export default Seo;