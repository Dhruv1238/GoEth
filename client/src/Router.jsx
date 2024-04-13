import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />

        </Routes>
    );
};

export default AppRouter;