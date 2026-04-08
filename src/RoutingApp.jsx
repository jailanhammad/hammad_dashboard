import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import WebsiteContent from './pages/website';


const RoutingApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/website" element={<WebsiteContent />} />

            </Routes>
        </Router>
    );
};

export default RoutingApp;