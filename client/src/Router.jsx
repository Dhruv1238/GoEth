import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Map from './pages/Map';
import WelcomePage from './pages/WelcomePage';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/map" element={<Map />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />


        </Routes>
    );
};

export default AppRouter;