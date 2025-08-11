import React, { useEffect, useState } from 'react';
import InventoryList from '../components/InventoryList';
import { getInventoryData } from '../services/api';
import Loader from '../components/common/loader/Loader';

const InventoryPage = () => {

    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const inventoryData = await getInventoryData();
                if (inventoryData?.data?.data?.products?.length) {
                    setInventory(inventoryData?.data?.data?.products);
                }
            } catch (error) {
                console.error('Failed to load inventory:', error);
            } finally {
                setLoading(false);
            }
        };
        loadInventory();
    }, []);

    return (
        <div className="inventory-page">
            {loading && <Loader size="medium" color="#2c3e50" />}
            <InventoryList data={inventory} />
        </div>
    );
};

export default InventoryPage;
