import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SubNavItem from './SubNavItem';
import styles from './../styles/SideNavbar.module.css';

const MainNavItem = ({ item, categories, isCollapsed }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const hasSubItems = (item.path === '/inventory' || item.path === '/products') && categories.length > 0;

    return (
        <li className={styles.navItem}>
            <NavLink
                to={item.path}
                className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                onClick={(e) => {
                    if (hasSubItems) {
                        e.preventDefault();
                        setIsExpanded(!isExpanded);
                    }
                }}
            >
                <span className={styles.icon}>{item.icon}</span>
                {!isCollapsed && (
                    <>
                        <span className={styles.label}>{item.label}</span>
                        {hasSubItems && (
                            <span className={styles.arrow}>
                                {isExpanded ? '▼' : '►'}
                            </span>
                        )}
                    </>
                )}
            </NavLink>

            {!isCollapsed && hasSubItems && isExpanded && (
                <ul className={styles.subMenu}>
                    {categories.map(category => (
                        <SubNavItem
                            key={category.id}
                            category={category}
                            parentPath={item.path}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MainNavItem;
