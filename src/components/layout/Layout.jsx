import React, { useState } from 'react';
import TopNavbar from './topNavbar/TopNavbar';
import SideNavbar from './sideNavbar/SideNavbar';
import styles from './styles/Layout.module.css';

const Layout = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={styles.layout}>
            <TopNavbar toggleSidebar={toggleSidebar} />
            <SideNavbar
                isCollapsed={isSidebarCollapsed}
                toggleCollapse={toggleSidebar}
            />
            <main
                className={`${styles.mainContent} ${isSidebarCollapsed ? styles.collapsed : ''}`}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;
