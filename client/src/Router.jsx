import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import WelcomePage from './pages/WelcomePage';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import RentalCars from './pages/RentalCars';
import MapSearch from './pages/MapSearch';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/map" element={<MapSearch />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rent" element={<RentalCars />} />



        </Routes>
    );
};

export default AppRouter;