import React, { useState } from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase'; 
import heroo from "../assets/home/heroo.svg";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        const { error: authError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });
    
        if (authError) {
            setError('Invalid login details. Please check your email and password.');
            setLoading(false);
            return; 
        }
    
        console.log("Login Successful!");
        navigate('/home'); 
    };
    
    {error && <div className="hml-error-msg">{error}</div>}

    return (
        <div className="hml-login-page">
            <div className="hml-login-card">
                <div className="hml-login-header">
                    <div className="car-wrapper">
                        <img src={heroo} className='hero-car' alt="hero-car"/>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Login to your Hammad Motors account</p>
                </div>

                <form onSubmit={handleSubmit} className="hml-login-form">
                    {error && <div className="hml-error-msg" style={{color: '#ff4d4d', fontSize: '14px', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}

                    <div className="hml-input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="example@mail.com" 
                            value={formData.email}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="hml-input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="••••••••" 
                            value={formData.password}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="hml-form-options">
                        <label><input type="checkbox" className='remember' /> Remember</label>
                        <a href="#forgot">Forgot Password?</a>
                    </div>

                    <button type="submit" className="hml-login-btn" disabled={loading}>                
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;