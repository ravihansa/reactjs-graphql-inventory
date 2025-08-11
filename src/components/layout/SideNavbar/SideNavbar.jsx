import React, { useEffect, useState } from 'react';
import { getCategoryData } from '../../../services/api';
import MainNavItem from './MainNavItem';
import styles from './../styles/SideNavbar.module.css';

const SideNavbar = ({ isCollapsed, toggleCollapse }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const mainMenuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/inventory', label: 'Inventory', icon: '📦' },
        { path: '/products', label: 'Products', icon: '🏷️' },
        { path: '/orders', label: 'Orders', icon: '🛒' },
        { path: '/settings', label: 'Settings', icon: '⚙️' }
    ];

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const catData = await getCategoryData();
                if (catData?.data?.data?.categories?.length) {
                    setCategories(catData?.data?.data?.categories);
                }
            } catch (error) {
                console.error('Failed to load categories:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    if (loading && !isCollapsed) return <div className={styles.sideNavbar}>Loading...</div>;

    return (
        <nav className={`${styles.sideNavbar} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.navHeader}>
                {!isCollapsed && <h3>Menu</h3>}
                <button className={styles.collapseButton} onClick={toggleCollapse}>
                    {isCollapsed ? '»' : '«'}
                </button>
            </div>

            <ul className={styles.navList}>
                {mainMenuItems.map(item => (
                    <MainNavItem
                        key={item.path}
                        item={item}
                        categories={categories}
                        isCollapsed={isCollapsed}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default SideNavbar;
