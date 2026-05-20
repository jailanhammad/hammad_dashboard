import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Website from './pages/website';
import App from './pages/app';
import Vehicles from './pages/vehicles';
import TestDrive from './pages/testdrive';
import Installments from './pages/installments';
import Sell from './pages/Sell';
import Reviews from './pages/reviews';
import Notifications from './pages/notifications';
import Settings from './pages/settings';
import VehicleEdit from './components/vehicleedit';
import Login from './pages/login';
import AboutWebPage from './components/aboutwebpage';
import AboutWebsite from './pages/aboutwebsite';
import ContactWebsite from './pages/contactwebsite';
import SoldWebsite from './pages/soldwebsite';
import ServicesWebsite from './pages/serviceswebsite';
import InstallmentsWebsite from './pages/installmentswebsite';


const RoutingApp = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/website" element={<Website />} />
                <Route path="/mobile-app" element={<App />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/brands" element={<Vehicles />} />
                <Route path="/test-drive" element={<TestDrive />} />
                <Route path="/installments" element={<Installments />} />
                <Route path="/sell-requests" element={<Sell />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin/edit/:id" element={<VehicleEdit />} />

                <Route path="/aboutwebpage" element={<AboutWebPage />} />
                <Route path="/aboutwebsite" element={<AboutWebsite />} />

                <Route path="/contactwebsite" element={<ContactWebsite />} />

                <Route path="/soldwebsite" element={<SoldWebsite />} />
                <Route path="/serviceswebsite" element={<ServicesWebsite />} />
                <Route path="/installmentswebsite" element={<InstallmentsWebsite />} />


            </Routes>
        </Router>
    );
};

export default RoutingApp;