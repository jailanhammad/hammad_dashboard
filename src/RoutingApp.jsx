import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Website from './pages/website';
import App from './pages/app';
import Vehicles from './pages/vehicles';


const RoutingApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/website" element={<Website />} />
                <Route path="/mobile-app" element={<App />} />
                <Route path="/vehicles" element={<Vehicles />} />



            </Routes>
        </Router>
    );
};

export default RoutingApp;