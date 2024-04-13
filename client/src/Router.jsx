import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Map from './pages/Map';
import WelcomePage from './pages/WelcomePage';
import Home from './pages/Home';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/map" element={<Map />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/home" element={<Home />} />


        </Routes>
    );
};

export default AppRouter;