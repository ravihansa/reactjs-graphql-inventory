import React, { useEffect, useState, useRef, } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAlerts } from '../providers/AlertProvider';
import Loader from '../components/common/loader/Loader';
import InventoryList from '../components/InventoryList';
import { useInventory } from '../contexts/InventoryContext';
import SearchBar from '../components/common/searchBar/SearchBar';
import { getInventoryData, searchInventoryData } from '../services/api';
import styles from './InventoryPage.module.css';


const InventoryPage = () => {

    const [loading, setLoading] = useState(true);
    // const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const { successAlert, errorAlert } = useAlerts();
    const timeoutRef = useRef(null);
    const { addToCart } = useCart();
    const { inventory, setInventory, decreaseStock } = useInventory();

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
        if (!inventory.length) {
            loadInventory();
        } else {
            setFilteredInventory(inventory);
            setLoading(false);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
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

    const handleApiSearch = async (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredInventory(inventory);
            return;
        }
        try {
            setLoading(true);
            const searchData = await searchInventoryData(searchTerm);
            const inventoryList = searchData?.data?.data?.productsByName;
            if (inventoryList) {
                const foundData = inventoryList.length;
                setFilteredInventory(inventoryList);
                successAlert(foundData ? `${foundData} items found` : 'No items found', {
                    position: 'top-center',
                    icon: foundData ? '✅' : '⛔',
                    style: { background: '#DBDBDB', color: '#181818' }
                });
            }
        } catch (error) {
            errorAlert(error.message);
            console.error('Failed to load search data:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = (searchValue) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            handleApiSearch(searchValue);
        }, 500);
    };

    const handleAddToCart = (item) => {
        if (item.inventory?.quantity > 0) {
            const { id, name, brand, price } = item;
            addToCart({ id, name, brand, price });
            // Decrease the inventory and  filteredInventory quantity
            decreaseStock(item.id, 1);
            setFilteredInventory(prev =>
                prev.map(p =>
                    p.id === item.id
                        ? { ...p, inventory: { ...p.inventory, quantity: p.inventory.quantity - 1 } }
                        : p
                )
            );
        }
    };

    return (
        <div className={styles.pageContainer}>
            {loading && <Loader size="medium" color="#2c3e50" />}
            <div className={styles.searchSection}>
                <SearchBar onSearch={debouncedSearch} placeholder="Product name..." />
            </div>
            <InventoryList data={filteredInventory} onAddToCart={handleAddToCart} />
        </div>
    );
};

export default InventoryPage;
