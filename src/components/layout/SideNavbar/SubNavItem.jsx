import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './../styles/SideNavbar.module.css';

const SubNavItem = ({ category, parentPath }) => {
    return (
        <li className={styles.subItem}>
            <NavLink
                to={`${parentPath}/category/${category.id}`}
                className={({ isActive }) =>
                    `${styles.subLink} ${isActive ? styles.active : ''}`
                }
            >
                {category.name}
            </NavLink>
        </li>
    );
};

export default SubNavItem;
