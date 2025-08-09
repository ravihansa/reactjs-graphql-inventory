import React from 'react';
import styles from './../styles/TopNavbar.module.css';

const TopNavbar = ({ toggleSidebar }) => {
    return (
        <header className={styles.topNavbar}>
            <div className={styles.leftSection}>
                <button className={styles.menuButton} onClick={toggleSidebar}>
                    ☰
                </button>
                <h1 className={styles.brand}>Inventory System</h1>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.userProfile}>
                    <span>User</span>
                    <div className={styles.avatar}>R</div>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
