import React, { useEffect, useState } from 'react';
import InventoryList from '../components/InventoryList';
import { getInventoryData } from '../services/api';
import Loader from '../components/common/loader/Loader';
import { useAlerts } from '../providers/AlertProvider';

const InventoryPage = () => {

    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState([]);
    const { successAlert, errorAlert } = useAlerts();

    const loadInventory = async () => {
        try {
            const inventoryData = await getInventoryData();
            if (inventoryData?.data?.data?.products?.length) {
                setInventory(inventoryData?.data?.data?.products);
                successAlert('Inventory data loaded successfully');
            }
        } catch (error) {
            errorAlert(error.message);
            console.error('Failed to load inventory:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
