import React from 'react';
import InventoryCard from './InventoryCard';
import styles from '../styles/InventoryList.module.css';

const InventoryList = ({ data }) => {

    if (!data.length) {
        return <div className={styles.noResults}>No inventory items found</div>;
    }

    return (
        <div className={styles.inventoryGrid}>
            {data.map(item => (
                <InventoryCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default InventoryList;
