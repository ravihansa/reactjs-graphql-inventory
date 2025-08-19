import React, { useEffect, useState, useCallback } from 'react';
import { useAlerts } from '../providers/AlertProvider';
import Loader from '../components/common/loader/Loader';
import InventoryList from '../components/InventoryList';
import SearchBar from '../components/common/searchBar/SearchBar';
import { getInventoryData, searchInventoryData } from '../services/api';
import styles from './InventoryPage.module.css';


const InventoryPage = () => {

    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const { successAlert, errorAlert } = useAlerts();

    const loadInventory = async () => {
        try {
            const inventoryData = await getInventoryData();
            const inventoryList = inventoryData?.data?.data?.products;
            if (inventoryList?.length) {
                setInventory(inventoryList);
                setFilteredInventory(inventoryList);
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

    /*
    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredInventory(inventory);
            return;
        }
        const filtered = inventory.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredInventory(filtered);
    };
    */

    const handleApiSearch = useCallback(
        async (searchTerm) => {
            if (!searchTerm.trim()) {
                setFilteredInventory(inventory);
                return;
            }
            try {
                setLoading(true);
                const searchData = await searchInventoryData(searchTerm);
                const inventoryList = searchData?.data?.data?.productsByName;
                if (inventoryList) {
                    setFilteredInventory(inventoryList);
                }
            } catch (error) {
                errorAlert(error.message);
                console.error('Failed to load search data:', error);
            } finally {
                setLoading(false);
            }
        }, [inventory]
    );

    return (
        <div className={styles.pageContainer}>
            {loading && <Loader size="medium" color="#2c3e50" />}
            <div className={styles.searchSection}>
                <SearchBar onSearch={handleApiSearch} placeholder="Product name..." />
            </div>
            <InventoryList data={filteredInventory} />
        </div>
    );
};

export default InventoryPage;
