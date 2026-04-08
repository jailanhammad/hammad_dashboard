import React from 'react';
import './settingscomponent.css';
import general from '../assets/home/general.svg';
import lng from '../assets/home/lng.svg';
import admin from '../assets/home/admin.svg';
import security from '../assets/home/security.svg';


const SettingsComponent = () => {
    return ( 
        <>
        
        <div class="sys-container">
        <header class="sys-header">
            <h1 class="sys-title">Settings</h1>
            <p class="sys-subtitle">Manage system settings and preferences</p>
        </header>

        <div class="sys-grid">
            
            <section class="sys-panel">
                <div class="sys-panel-head">
                    <i class="fa-solid fa-gear sys-icon-red">
                        <img src={general} alt="general-icon" />
                    </i>
                    <h3>General Settings</h3>
                </div>
                <div class="sys-form">
                    <div class="sys-group">
                        <label>Site Name</label>
                        <input type="text" class="sys-input" value="Hammad Motors"/>
                    </div>
                    <div class="sys-group">
                        <label>Contact Email</label>
                        <input type="email" class="sys-input" value="mahmoud@hammadmotors.com"/>
                    </div>
                    <div class="sys-group">
                        <label>Phone Number</label>
                        <input type="text" class="sys-input" value="+01000444401"/>
                    </div>
                    <button class="sys-btn-save">
                        <i class="fa-regular fa-floppy-disk"></i> Save Changes
                    </button>
                </div>
            </section>

            <section class="sys-panel">
                <div class="sys-panel-head">
                    <i class="sys-icon-gold">
                    <img src={lng} alt="langauge-icon" />
                    </i>
                    <h3>Language Settings</h3>
                </div>
                <div class="sys-list">
                    <div class="sys-list-item">
                        <div>
                            <h4>English</h4>
                            <p>Primary language</p>
                        </div>
                        <span class="sys-tag-active">Active</span>
                    </div>
                    <div class="sys-list-item">
                        <div>
                            <h4>Arabic (العربية)</h4>
                            <p>Secondary language</p>
                        </div>
                        <span class="sys-tag-active">Active</span>
                    </div>
                </div>
            </section>

            <section class="sys-panel">
                <div class="sys-panel-head">
                    <i class="fa-solid fa-user-group sys-icon-green">
                    <img src={admin} alt="admin-icon" />
                    </i>
                    <h3>Admin Users</h3>
                </div>
                <div class="sys-list">
                    <div class="sys-list-item">
                        <div>
                            <h4>Admin User</h4>
                            <p>admin@hammadmotors.com</p>
                        </div>
                        <span class="sys-role sys-role-super">Super Admin</span>
                    </div>
                    <div class="sys-list-item">
                        <div>
                            <h4>Manager</h4>
                            <p>manager@hammadmotors.com</p>
                        </div>
                        <span class="sys-role sys-role-manager">Manager</span>
                    </div>
                    <button class="sys-btn-add">Add New User</button>
                </div>
            </section>

            <section class="sys-panel">
                <div class="sys-panel-head">
                    <i class="fa-solid fa-shield-halved sys-icon-gold">
                    <img src={security} alt="security-icon" />
                    </i>
                    <h3>Security</h3>
                </div>
                <div class="sys-toggle-group">
                    <div class="sys-toggle-item">
                        <div>
                            <h4>Two-Factor Authentication</h4>
                            <p>Add extra security layer</p>
                        </div>
                        <label class="sys-switch">
                            <input type="checkbox" checked/>
                            <span class="sys-slider"></span>
                        </label>
                    </div>
                    <div class="sys-toggle-item">
                        <div>
                            <h4>Login Notifications</h4>
                            <p>Get notified of new logins</p>
                        </div>
                        <label class="sys-switch">
                            <input type="checkbox" checked/>
                            <span class="sys-slider"></span>
                        </label>
                    </div>
                </div>
            </section>

        </div>
    </div>
        
        
        
        
        
        </>
     );
}
 
export default SettingsComponent;