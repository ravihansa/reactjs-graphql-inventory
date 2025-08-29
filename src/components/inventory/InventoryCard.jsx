import React from 'react';
import styles from './styles/InventoryCard.module.css';

const InventoryCard = ({ item, onAddToCart }) => {
    const statusColor = item.inventory?.status === true ? 'green' : 'red';

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.productName}>{item.name}</h3>
                <span className={styles.badge} style={{ backgroundColor: statusColor }}>
                    {item.inventory?.status ? 'in stock' : 'out of stock'}
                </span>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                    <span>Brand:</span>
                    <span>{item.brand ?? '---'}</span>
                </div>
                <div className={styles.infoRow}>
                    <span>Quantity:</span>
                    <span className={styles.quantity}>{item.inventory?.quantity}</span>
                </div>
                <div className={styles.infoRow}>
                    <span>Price:</span>
                    <span>${item.price.toFixed(2)}</span>
                </div>
            </div>
            <div className={styles.cardFooter}>
                <button className={styles.actionButton}>
                    View Details
                </button>
                <button
                    className={`${styles.actionButton} ${styles.primary}`}
                    onClick={() => onAddToCart(item)}
                    disabled={!item.inventory?.status || item.inventory?.quantity <= 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default InventoryCard;
