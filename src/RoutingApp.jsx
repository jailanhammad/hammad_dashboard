import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Website from './pages/website';
import App from './pages/app';
import Vehicles from './pages/vehicles';
import TestDrive from './pages/testdrive';
import Installments from './pages/installments';


const RoutingApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/website" element={<Website />} />
                <Route path="/mobile-app" element={<App />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/test-drive" element={<TestDrive />} />
                <Route path="/installments" element={<Installments />} />




            </Routes>
        </Router>
    );
};

export default RoutingApp;