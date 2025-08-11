import React from 'react';
import InventoryCard from './InventoryCard';
import styles from '../styles/InventoryList.module.css';

const InventoryList = ({ data }) => {

    return (
        <div className={styles.inventoryGrid}>
            {data.map(item => (
                <InventoryCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default InventoryList;
