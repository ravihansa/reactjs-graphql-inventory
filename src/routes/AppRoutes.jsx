import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InventoryPage from '../pages/InventoryPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/" element={<InventoryPage />} />
        </Routes>
    );
};

export default AppRoutes;
