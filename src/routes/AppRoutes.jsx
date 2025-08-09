import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InventoryPage from '../pages/InventoryPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<InventoryPage />} />
            <Route path="/dashboard" element={<InventoryPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inventory/category/:categoryId" element={<InventoryPage />} />
            <Route path="/products/category/:categoryId" element={<InventoryPage />} />
            <Route path="/orders" element={<InventoryPage />} />
            <Route path="/settings" element={<InventoryPage />} />
        </Routes>
    );
};

export default AppRoutes;
