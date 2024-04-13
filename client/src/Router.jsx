import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Map from './pages/Map';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/map" element={<Map />} />
        </Routes>
    );
};

export default AppRouter;